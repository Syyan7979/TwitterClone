import { NgxFileDropEntry } from '@bugsplat/ngx-file-drop';
import { AuthService } from './../../services/auth.service';
import { TweetService } from './../../services/tweet.service';
import { User } from './../../interfaces/user';
import { Tweet } from './../../interfaces/tweet';
import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewTweet } from './../../interfaces/tweet';
import { from, mergeMap, bindCallback, Observable } from 'rxjs';

@Component({
  selector: 'app-quote-popup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quote-popup.component.html',
  styleUrls: ['./quote-popup.component.css']
})
export class QuotePopupComponent implements OnInit {

  constructor(
    public activeModal : NgbActiveModal,
    private tweetService : TweetService,
    private authService : AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  @Input() tweet !: Tweet;
  @Input() user !: User;
  content : string = '';

  tweetMedias : string[] = [];
  quotedTweet : boolean = false;

  selectedFiles : File[] = [];
  selectedImages : unknown[] = [];

  ngOnInit(): void {
    this.parseTweetMedia();
  }

  parseTweetMedia() : void {
    if (this.tweet.media) {
      this.tweetMedias = JSON.parse(this.tweet.media);
    }
  }

  closeModal() : void {
    this.activeModal.close();
  }

  readAsDataURL(file : File) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = function() {
        return resolve(reader.result);
      }
      reader.readAsDataURL(file);
    })
  }

  async onFilesDropped(files: NgxFileDropEntry[]) {
    if (this.selectedFiles.length < 4 && this.selectedFiles.length + files.length <= 4) {
      from(files).pipe(
        mergeMap(selectedFile => {
          const fileEntry = selectedFile.fileEntry as FileSystemFileEntry;
          const observableFactory = bindCallback(fileEntry.file) as any;
          const file$ = observableFactory.call(fileEntry) as Observable<File>;
          return file$
        })
      ).subscribe(file => this.selectedFiles.push(file))
      let images = await Promise.all(this.selectedFiles.map(f=>{return this.readAsDataURL(f)}));
      this.selectedImages = images;
      this.changeDetectorRef.detectChanges();
      console.log(this.selectedImages.length)
    } else {
      window.alert("Please choose up to 4 photos")
    }
  }

  quoteTweet() {
    let fd = new FormData();
    this.selectedFiles.forEach((file) => { fd.append('images', file, file.name) })
    this.tweetService.uploadPhotos(fd).subscribe(
      res => {
        let body : NewTweet = {
          user_id : this.authService.parsedToken(),
          reply_id : null,
          content : this.content,
          media : res === 'null'? res : JSON.stringify(res),
          likes : 0,
          user_name : this.user.user_name,
          twitter_handle : this.user.twitter_handle,
          profile_image : this.user.profile_image,
          retweet_id : null,
          retweet_user_id : null,
          retweet_twitter_handle : null,
          quote_tweet_id : this.tweet.tweet_id,
          retweet_quoute_count : 0
        }
        this.tweetService.newTweet(body).subscribe();
        this.content = '';
        this.selectedFiles = [];
        this.selectedImages = [];
      }
    );
    this.closeModal();
  }
}
