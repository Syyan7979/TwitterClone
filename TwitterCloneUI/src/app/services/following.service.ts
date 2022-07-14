import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Follow, FollowCheck } from '../interfaces/follow';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {

  private followUrl : string = 'http://localhost:3000/follows';

  constructor( private http : HttpClient) { }

  checkFollowing( following : FollowCheck ) : Observable<boolean> {
    return this.http.get<boolean>(this.followUrl + `?followerId=${following.follower_id}&followeeId=${following.followee_id}`);
  }

  createFollow( following : FollowCheck) : Observable<Follow> {
    return this.http.post<Follow>(this.followUrl, following);
  }

  deleteFollow (following : FollowCheck) : Observable<Follow> {
    return this.http.delete<Follow>(this.followUrl + `?followerId=${following.follower_id}&followeeId=${following.followee_id}`);
  }
}
