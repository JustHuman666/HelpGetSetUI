import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'HelpGetSet_UI';
  constructor(private authService: AuthService, userService: UserService, private router: Router) {
    if(this.isLoggedIn){
      userService.getUserById(this.authService.getUserId()).subscribe((user) => {
        this.userName = user.userName;
        this.phoneNumber = user.phoneNumber;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.birthday = user.birthday;
        this.gender = user.gender;
      });
    }
  }

  userName: string = '';

  phoneNumber: string = '';

  firstName: string = '';

  lastName : string = '';

  birthday!: Date;

  gender : string = '';

  public get isLoggedIn() : boolean {
    return this.authService.isAuthenticated();
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate([''])
  }
}
