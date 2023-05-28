import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

import { ChangePassword } from 'src/app/interfaces/profile_info/change-password';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})


export class ChangePasswordComponent implements OnInit{
    constructor(private userService: UserService, 
        private authService: AuthService,
        private router: Router) {
    }

    error!: string;

    changeForm!: FormGroup;

    ngOnInit(): void {
        this.error = '';
        this.changeForm = new FormGroup({
        oldPassword: new FormControl(),
        newPassword: new FormControl(),
        newPasswordAgain: new FormControl()
        });
    }

    changePassword(){
      let passwordModel: ChangePassword = {
        oldPassword: this.changeForm.value.oldPassword,
        newPassword: this.changeForm.value.newPassword
      }
        this.userService.changeUserPassword(passwordModel).subscribe(
            () => {
                this.authService.logOut();
                alert("Your password was successfully changed!");
                this.router.navigate(['/login']);
              },
              (exception) => {
                this.error = exception.message;
              }
        );
    }

}