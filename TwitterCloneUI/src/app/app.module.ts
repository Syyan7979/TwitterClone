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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
