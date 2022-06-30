import { Tweet } from './../interfaces/tweet';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private tweetUrl : string = "http://localhost:3000/tweets"
  constructor(private http: HttpClient) { }

  newTweet(tweet : Tweet) : Observable<Tweet> {
    return this.http.post<any>(this.tweetUrl + '/create', tweet);
  }
}
