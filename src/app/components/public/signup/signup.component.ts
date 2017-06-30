import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  signup(username: string, password: string, confirmpassword: string) {
    if (password === confirmpassword) {
      this.userService.signup(username, password);
    } else {
      return;
    }
  }

  ngOnInit() {
  }

}
