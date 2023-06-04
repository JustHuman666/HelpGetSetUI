import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';

import { UserService } from "src/app/services/user-service/user.service";
import { AuthService } from "src/app/services/auth-service/auth.service";
import { Error } from "src/app/error-handle/error";
import { CountryService } from "src/app/services/country-service/country.service";
import { GetUser } from "src/app/interfaces/user/get-user";
import { LoggedUserProfile } from "src/app/interfaces/user/logged-user-profile";
import { GetCountry } from "src/app/interfaces/country/get-country";
import { MatDatepicker } from "@angular/material/datepicker";
import { MigrantService } from "src/app/services/migrant-service/migrant.service";
import { Volunteer } from "src/app/interfaces/volunteer/volunteer";
import { VolunteerService } from "src/app/services/volunteer-service/volunteer.service";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

    currentDate: string;
    genders: string[];
    countries: GetCountry[];

    constructor(private userService: UserService,
      private authService: AuthService,
      private countryService: CountryService,
      private migrantService: MigrantService,
      private volunteerService: VolunteerService,
      private router: Router) {
        let today = new Date();
        this.currentDate = today.toISOString().split('T')[0];
        this.genders = ["Female", "Male", "Other"]
        this.countries = [];
        this.countryService.getAllCountries().subscribe(
          (data) => {
            this.countries = data;
          }
        )
    }
    originalCountry!: GetCountry;

    currentCountry!: GetCountry;

    userName!: string;

    firstName!: string;

    phoneNumber!: string;

    lastName!: string;

    isAdmin: boolean = false;

    birthday!: Date;

    foundGender!: string;

    error!: string;

    userId!: number;

    updateForm!: FormGroup;

    isVolunteer!: boolean;

    isMigrant!: boolean;

    ngOnInit(): void {
      this.updateForm = new FormGroup({
        userName: new FormControl(),
        firstName: new FormControl(),
        lastName: new FormControl(),
        phoneNumber: new FormControl(),
        gender: new FormControl(),
        birthday: new FormControl(),
        currentCountryId: new FormControl(),
        originalCountryId: new FormControl()
      });
      this.userService.getThisUserProfile().subscribe(
        (profile) => {
          this.userId = profile.id;
          this.checkIfMigrant();
          this.checkIfVolunteer();
          this.userName = profile.userName;
          this.firstName = profile.firstName;
          this.lastName = profile.lastName;
          this.birthday = profile.birthday;
          this.foundGender = profile.gender;
          this.userId = profile.id;
          this.phoneNumber = profile.phoneNumber;
          this.countryService.getCountryById(profile.originalCountryId).subscribe(
            (country) => {
              this.originalCountry = country;
              this.countryService.getCountryById(profile.currentCountryId).subscribe(
                (data) => {
                  this.currentCountry = data;
                  this.fillForm();
                }
              );
            }
          );
        });
      this.checkIfMigrant();
      this.checkIfVolunteer();
      this.userService.getUserRoles().subscribe(roles => {
          if(roles.includes("Admin")){
            this.isAdmin = true;
          }
        });

      this.error = '';
    }

    update(){
      this.userService.updateThisUserInfo(this.updateForm.value).subscribe(
          (profile) => {
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
              alert("Your profile was successfully deleted, but you still can use the service and register again.");
              this.authService.logOut();
              this.router.navigate(['']);
            });
        }
    }

    dateError: string = '';
    dateIsValid!: boolean;
    isValid(): boolean{
      let birthday = this.updateForm.value.birthday;
      this.dateIsValid = birthday !== "yyyy-mm-d" && birthday >= "1900-01-01" && birthday <= this.currentDate;
      if(!this.dateIsValid){
        this.dateError = "Date must be chosen, after 1900 y. and before tomorrow."
      }
      let genderIsValid = this.genders.includes(this.updateForm.value.gender)
      return this.updateForm.valid && this.dateIsValid && genderIsValid;
    }

    fillForm(){
      this.updateForm.setValue({
        userName: this.userName,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        gender: this.foundGender,
        currentCountryId: this.currentCountry.id,
        originalCountryId: this.originalCountry.id,
        birthday: null
      });
    }
  
    checkIfMigrant(){
        this.migrantService.getMigrantByUserId(this.userId).subscribe(
            (data) => {
                if(data.id > 0){
                    this.isMigrant = true;
                }
            }
        );
        this.isMigrant = false;
    }

    checkIfVolunteer(){
        this.volunteerService.getVolunteerByUserId(this.userId).subscribe(
            (data) => {
                if(data.id > 0){
                    this.isVolunteer = true;
                }
                
            }
        );
        this.isVolunteer = false;
    }
   
}
  