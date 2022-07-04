import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  constructor(private router: Router, private route : ActivatedRoute, private userService : UserService, public authService : AuthService) {}

  ngOnInit(): void {
  }

  showHomePage(): void {
    this.router.navigate(['home'], {relativeTo: this.route});
  }

  showProfilePage() : void {
    this.router.navigate(['user', this.authService.parsedToken()], { relativeTo: this.route});
  }

}
