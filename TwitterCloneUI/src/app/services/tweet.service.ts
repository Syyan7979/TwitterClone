import { Trend } from './../interfaces/trend';
import { Tweet, NewTweet } from './../interfaces/tweet';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private tweetUrl : string = "http://localhost:3000/tweets"
  private likesUrl : string = "http://localhost:3000/likes"
  constructor(private http: HttpClient) { }

  newTweet(tweet : NewTweet) : Observable<Tweet> {
    return this.http.post<Tweet>(this.tweetUrl, tweet);
  }

  getTweet(id : string) : Observable<Tweet> {
    return this.http.get<Tweet>(this.tweetUrl + `/${id}`);
  }

  getTrends() : Observable<Trend[]> {
    return this.http.get<Trend[]>(this.tweetUrl + `/trends/route`)
  }

  deleteTweet(id : string) : Observable<any> {
    return this.http.delete<Tweet>(this.tweetUrl + `/${id}`);
  }

  updateTweet(id : string, body : object) : Observable<any> {
    return this.http.patch<any>(this.tweetUrl + `/${id}`, body);
  }

  getTweetReplies(id : string) : Observable<Tweet[]>{
    return this.http.get<Tweet[]>(this.tweetUrl + `/${id}/replies`);
  }

  establishLike(usrId : string | undefined, twtId : string) : Observable<any> {
    let body = {
      liker_id : usrId,
      tweet_id : twtId
    }
    console.log(body)
    return this.http.post<any>(this.likesUrl, body);
  }

  deleteLike(usrId : string | undefined, twtId : string) : Observable<any> {
    return this.http.delete<any>(this.likesUrl + `?userId=${usrId}&tweetId=${twtId}`);
  }

  deleteRetweet(usrId : string | undefined, twtId : string) : Observable<any> {
    return this.http.delete<any>(this.tweetUrl + `?userId=${usrId}&tweetId=${twtId}`);
  }

  likeExistence(usrId : string | undefined, twtId : string) : Observable<boolean> {
    return this.http.get<boolean>(this.likesUrl +`?userId=${usrId}&tweetId=${twtId}`);
  }

  retweetExistence(usrId : string | undefined, twtId : string) : Observable<boolean> {
    return this.http.get<boolean>(this.tweetUrl + `?userId=${usrId}&tweetId=${twtId}`);
  }

  getUserFeed(userId : string | undefined) : Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.tweetUrl +`/feed/userId=${userId}`);
  }

  getUserLikes(userId : string | undefined) : Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.tweetUrl +`/likes/userId=${userId}`);
  }

  getUserMedias(userId : string | undefined) : Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.tweetUrl +`/medias/userId=${userId}`);
  }

  getUserTweets(userId : string | undefined) : Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.tweetUrl +`?userId=${userId}`);
  }

  uploadPhotos(fd : FormData) : Observable<string[] | string> {
    return this.http.post<string[] | string>(this.tweetUrl + '/photos', fd);
  }
}
