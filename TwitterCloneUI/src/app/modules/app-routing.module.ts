import { HomeComponent } from './../components/home/home.component';
import { GeneralComponent } from './../components/general/general.component';
import { SignupComponent } from './../components/signup/signup.component';
import { LoginComponent } from './../components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { 
    path: '', 
    component: GeneralComponent,
    children : [
      { path : 'home', component : HomeComponent },
    ]
  },
  { path : 'login', component : LoginComponent },
  { path :'signup', component : SignupComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
