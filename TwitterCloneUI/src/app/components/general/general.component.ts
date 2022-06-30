import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  constructor(private router: Router, private route : ActivatedRoute, private userService : UserService) {}

  ngOnInit(): void {
  }

  showHomePage(): void {
    this.router.navigate(['home'], {relativeTo: this.route});
  }

}
