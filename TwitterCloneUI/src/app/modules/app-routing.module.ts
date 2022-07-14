import { FollowingsComponent } from './../components/followings/followings.component';
import { FollowersComponent } from './../components/followers/followers.component';
import { StatusComponent } from './../components/status/status.component';
import { ProfileComponent } from './../components/profile/profile.component';
import { LandingComponent } from './../components/landing/landing.component';
import { HomeGuard, LoginGuard } from '../guards/auth.guard';
import { HomeComponent } from './../components/home/home.component';
import { GeneralComponent } from './../components/general/general.component';
import { SignupComponent } from './../components/signup/signup.component';
import { LoginComponent } from './../components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLikesComponent } from './../components/profile/user-likes/user-likes.component';
import { UserTweetsComponent } from '../components/profile/user-tweets/user-tweets.component';
import { WithRepliesComponent } from '../components/profile/with-replies/with-replies.component';
import { UserMediasComponent } from '../components/profile/user-medias/user-medias.component';
import { ConnectComponent } from '../components/connect/connect.component';

const routes : Routes = [
  { path: '', component: LandingComponent, canActivate : [LoginGuard]},
  { 
    path: '', 
    component: GeneralComponent,
    children : [
      { path : 'home', 
        component : HomeComponent,
        canActivate : [HomeGuard] }, 
      { path : 'user/:userId', component : ProfileComponent, children : [
        { path : '', component : UserTweetsComponent}, {path : 'with_replies', component : WithRepliesComponent}, {path : 'medias', component : UserMediasComponent}, {path : 'likes', component : UserLikesComponent}
      ]}, {path : 'user/:userId/status/:tweetId', component : StatusComponent}, 
      {path : 'connect', component : ConnectComponent}, {path : 'user/:userId/followings', component : FollowingsComponent}, 
      {path : 'user/:userId/followers', component : FollowersComponent}
    ]
  },
  { path : 'login', component : LoginComponent, canActivate : [LoginGuard] },
  { path :'signup', component : SignupComponent, canActivate : [LoginGuard] }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
