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

  checkFollowing( following : FollowCheck ) : Observable<Follow> {
    return this.http.get<Follow>(this.followUrl + `?followerId=${following.followerId}&followeeId=${following.followeeId}`);
  }

  createFollow( following : FollowCheck) : Observable<Follow> {
    return this.http.post<Follow>(this.followUrl, following);
  }

  deleteFollow (following : FollowCheck) : Observable<Follow> {
    return this.http.delete<Follow>(this.followUrl + `?followerId=${following.followerId}&followeeId=${following.followeeId}`);
  }
}
