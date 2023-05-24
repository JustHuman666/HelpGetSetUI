import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';

import { UserService } from "src/app/services/user-service/user.service";
import { AuthService } from "src/app/services/auth-service/auth.service";
import { Error } from "src/app/error-handle/error";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

    currentDate: string;
    genders: string[];

    constructor(private userService: UserService, 
        private authService: AuthService,
        private router: Router) {
          let today = new Date();
          this.currentDate = today.toISOString().split('T')[0];
          this.genders = ["Female", "Male", "Other"]
      }

    userName!: string;

    firstName!: string;

    lastName!: string;

    isAdmin: boolean = false;

    birthday!: Date;

    gender!: string;

    error!: string;

    updateForm!: FormGroup;

    ngOnInit(): void {
      this.updateForm = new FormGroup({
        userName: new FormControl(),
        firstName: new FormControl(),
        lastName: new FormControl(),
        phoneNumber: new FormControl(),
        gender: new FormControl(),
        birthday: new FormControl(),
      });
      this.userService.getThisUserProfile().subscribe((profile) => {
      this.userName = profile.userName;
      this.firstName = profile.firstName;
      this.lastName = profile.lastName;
      this.birthday = profile.birthday;
      this.gender = profile.gender;
      this.updateForm.setValue({
          userName: profile.userName,
          firstName: profile.firstName,
          lastName: profile.lastName,
          phoneNumber: profile.phoneNumber,
          gender: profile.gender,
          birthday: null
        });
      });

      this.userService.getUserRoles().subscribe(roles => {
          if(roles.includes("Admin")){
            this.isAdmin = true;
          }
        })

      this.error = '';
    }

    update(){
        this.userService.updateThisUserInfo(this.updateForm.value).subscribe(
            () => {
                alert("Your profile was successfully updated!");
                window.location.reload();
              },
              (exception) => {
                this.error = Error.returnErrorMessage(exception);
              }
        );
    }

    deleteAccount(){
        if(confirm("Are you sure, you want to delete your account?")) {
            this.userService.deleteThisUser().subscribe(() => {
              this.authService.logOut();
              this.router.navigate(['']);
            });
        }
    }

    changePassword(){
        this.router.navigate([""]);
    }

    isValid(): boolean{
      let dateIsValid = this.updateForm.value.birthday !== "yyyy-mm-dd"
      let genderIsValid = this.genders.includes(this.updateForm.value.gender)
      return this.updateForm.valid && dateIsValid && genderIsValid
    }
   
}
  