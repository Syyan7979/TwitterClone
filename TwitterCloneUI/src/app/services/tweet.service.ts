import { Tweet, NewTweet } from './../interfaces/tweet';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private tweetUrl : string = "http://localhost:3000/tweets"
  constructor(private http: HttpClient) { }

  newTweet(tweet : NewTweet) : Observable<Tweet> {
    return this.http.post<Tweet>(this.tweetUrl, tweet);
  }

  getTweet(id : string) : Observable<Tweet> {
    return this.http.get<Tweet>(this.tweetUrl + `/${id}`);
  }

  getTweetReplies(id : string) : Observable<Tweet[]>{
    return this.http.get<Tweet[]>(this.tweetUrl + `/${id}/replies`);
  }
}
