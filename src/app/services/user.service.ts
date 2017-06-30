import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from 'app/models/user';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  id = '';
  apiUrl = 'https://taskschedulerbackend.herokuapp.com';
  constructor(private http: Http,
    private router: Router) { }

  login(username: string, password: string): void {
    this.http.post(`${this.apiUrl}/login`,
      JSON.stringify({
        username: username,
        password: password
      }))
      .subscribe(response => {
        if (response.status === 200) {
          const user = response.json() as User;
          this.id = user.id;
          this.router.navigate(['dashboard']);
        }
      });
  }

  signup(username: string, password: string): void {
    this.http.post(`${this.apiUrl}/signup`,
      JSON.stringify({
        username: username,
        password: password
      }))
      .subscribe(response => {
        if (response.status === 200) {
          const user = response.json() as User;
          this.id = user.id;
          this.router.navigate(['dashboard']);
        }
      });
  }

  changePassword(username: string, oldpassword: string, newpassword: string): void {
    this.http.put(`${this.apiUrl}/update`,
      JSON.stringify({
        username: username,
        oldpassword: oldpassword,
        newpassword: newpassword
      }))
      .subscribe(response => {
        if (response.status === 200) {
          const user = response.json() as User;
          this.id = user.id;
        }
      });
  }
}
