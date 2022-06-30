import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private user = '';

  constructor(private userService : UserService, private router : Router) {
    const navigation = this.router.getCurrentNavigation();
    const user = navigation?.extras.state as {id :string};
    this.user = userService.getUserId();
  }

  ngOnInit(): void {
  }

}
