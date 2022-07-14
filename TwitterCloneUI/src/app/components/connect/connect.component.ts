import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  users : User[] = [];
  constructor(
    private userService: UserService,
    private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() : void { 
    const id = String(this.route.snapshot.queryParamMap.get('userId'));
    this.userService.getUserRecommendations(id).subscribe(
      users => this.users = users);
  }

}
