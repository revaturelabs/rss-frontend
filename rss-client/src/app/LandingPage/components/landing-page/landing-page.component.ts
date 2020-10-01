import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/User/user/services/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private userService: UserService) { }

  //testing push
  ngOnInit(): void {
  }

}
