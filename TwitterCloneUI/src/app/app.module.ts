import { TokenInterceptorService } from './services/token-interceptor.service';
import { HomeGuard, LoginGuard } from './guards/auth.guard';
import { AppRoutingModule } from './modules/app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { GeneralComponent } from './components/general/general.component';
import { NavComponent } from './components/nav/nav.component';
import { ContentsComponent } from './components/contents/contents.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FeedComponent } from './components/feed/feed.component';
import { CreateTweetComponent } from './components/create-tweet/create-tweet.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import { UserTweetsComponent } from './components/profile/user-tweets/user-tweets.component';
import { WithRepliesComponent } from './components/profile/with-replies/with-replies.component';
import { UserMediasComponent } from './components/profile/user-medias/user-medias.component';
import { UserLikesComponent } from './components/profile/user-likes/user-likes.component';
import { UserComponent } from './components/user/user.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { StatusComponent } from './components/status/status.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FollowRecommendationComponent } from './components/follow-recommendation/follow-recommendation.component';
import { FollowWindowComponent } from './components/follow-window/follow-window.component';
import { ConnectComponent } from './components/connect/connect.component';
import { FollowersComponent } from './components/followers/followers.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FollowingsComponent } from './components/followings/followings.component';
import { HashtagPipe } from './pipes/hashtag.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    GeneralComponent,
    NavComponent,
    ContentsComponent,
    LoginComponent,
    SignupComponent,
    FeedComponent,
    CreateTweetComponent,
    HomeComponent,
    ProfileComponent,
    UserTweetsComponent,
    WithRepliesComponent,
    UserMediasComponent,
    UserLikesComponent,
    UserComponent,
    TweetComponent,
    StatusComponent,
    NavigationComponent,
    FollowRecommendationComponent,
    FollowWindowComponent,
    ConnectComponent,
    FollowersComponent,
    ClickOutsideDirective,
    FollowingsComponent,
    HashtagPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    {provide : HTTP_INTERCEPTORS, useClass : TokenInterceptorService, multi: true}, 
    AuthService, 
    HomeGuard, 
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
