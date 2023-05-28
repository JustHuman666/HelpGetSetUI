import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';

import { UserService } from "src/app/services/user-service/user.service";
import { AuthService } from "src/app/services/auth-service/auth.service";
import { Error } from "src/app/error-handle/error";
import { CountryService } from "src/app/services/country-service/country.service";
import { GetUser } from "src/app/interfaces/user/get-user";
import { LoggedUserProfile } from "src/app/interfaces/user/logged-user-profile";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

    currentDate: string;
    genders: string[];
    countries: string[];

    constructor(private userService: UserService,
      private authService: AuthService,
      private countryService: CountryService,
      private router: Router) {
        let today = new Date();
        this.currentDate = today.toISOString().split('T')[0];
        this.genders = ["Female", "Male", "Other"]
        this.countries = [];
        this.countryService.getAllCountries().subscribe(
          (data) => {
            if(data.length >= 0){
              data.forEach(country => {
                this.countries.push(country.name)
              });
            }
          }
        )
    }
    originalCountry!: string;

    currentCountry!: string;

    userName!: string;

    firstName!: string;

    lastName!: string;

    isAdmin: boolean = false;

    birthday!: Date;

    gender!: string;

    error!: string;

    updateForm!: FormGroup;

    ngOnInit(): void {
      let originalCountryName = '';
      let currentCountryName = '';
      this.updateForm = new FormGroup({
        userName: new FormControl(),
        firstName: new FormControl(),
        lastName: new FormControl(),
        phoneNumber: new FormControl(),
        gender: new FormControl(),
        birthday: new FormControl(),
        currentCountry: new FormControl(),
        originalCountry: new FormControl()
      });
      this.userService.getThisUserProfile().subscribe(
        (profile) => {
          this.countryService.getCountryById(profile.originalCountryId).subscribe(
            (country) => {
              originalCountryName = country.name;
            }
          );
          this.countryService.getCountryById(profile.currentCountryId).subscribe(
            (country) => {
              currentCountryName = country.name;
            }
          );
          this.userName = profile.userName;
          this.firstName = profile.firstName;
          this.lastName = profile.lastName;
          this.birthday = profile.birthday;
          this.gender = profile.gender;
          this.originalCountry = originalCountryName;
          this.currentCountry = currentCountryName;
          this.updateForm.setValue({
            userName: profile.userName,
            firstName: profile.firstName,
            lastName: profile.lastName,
            phoneNumber: profile.phoneNumber,
            gender: profile.gender,
            currentCountry: this.currentCountry,
            originalCountry: this.originalCountry,
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
      let originalCountry = this.genders.includes(this.updateForm.value.originalCountry)
      let currentCountry = this.genders.includes(this.updateForm.value.currentCountry)
      return this.updateForm.valid && dateIsValid && genderIsValid && originalCountry && currentCountry
    }
   
}
  