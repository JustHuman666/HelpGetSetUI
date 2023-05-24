import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from "src/app/services/auth-service/auth.service";

import { Error } from "src/app/error-handle/error";
import { UserService } from "src/app/services/user-service/user.service";
import { GetUser } from "src/app/interfaces/user/get-user";
import { MigrantService } from "src/app/services/migrant-service/migrant.service";
import { VolunteerService } from "src/app/services/volunteer-service/volunteer.service";
import { Migrant } from "src/app/interfaces/migrant/migrant";
import { Volunteer } from "src/app/interfaces/volunteer/volunteer";
import { CountryService } from "src/app/services/country-service/country.service";

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  currentDate: string;
  genders: string[];

    constructor(
      private authService: AuthService,
      private userService: UserService,
      private migrantService: MigrantService,
      private volunteerServidce: VolunteerService,
      private countryService: CountryService,
      private router: Router) {
      let today = new Date();
      this.currentDate = today.toISOString().split('T')[0];
      this.genders = ["Female", "Male", "Other"]
    }

    registerForm!: FormGroup;

    error!: string;

    newUser!: GetUser;

    defaultMigrant!: Migrant;

    defaultVolunteer!: Volunteer;

    originalCountryId!: number;
    
    currentCountryId!: number;

    ngOnInit(): void {
        
        this.error = '';
        this.registerForm = new FormGroup({
          userName: new FormControl(),
          firstName: new FormControl(),
          lastName: new FormControl(),
          phoneNumber: new FormControl(),
          gender: new FormControl(),
          birthday: new FormControl(),
          originalCountry: new FormControl(),
          currentCountry: new FormControl(),
          password: new FormControl()
        });
    }

    registerMigrant(){
      this.countryService.getCountryByName(this.registerForm.value.originalCountry).subscribe(
        (data) => {
          this.originalCountryId = data.id;
        },
        (exception) => {
          this.error = Error.returnErrorMessage(exception);
        }
      )
      this.countryService.getCountryByName(this.registerForm.value.currentCountry).subscribe(
        (data) => {
          this.currentCountryId = data.id;
        },
        (exception) => {
          this.error = Error.returnErrorMessage(exception);
        }
      )
      this.authService.register({
        phoneNumber: this.registerForm.value.phoneNumber,
        userName: this.registerForm.value.userName,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        password: this.registerForm.value.password,
        birthday: this.registerForm.value.birthday,
        gender: this.registerForm.value.gender,
        countries: [this.originalCountryId, this.currentCountryId]
      }).subscribe(
          () => {
              alert("Your account was successfully created!");
              this.userService.getUserProfileByUserName(this.registerForm.value.userName).subscribe(
                (data) => {
                    this.newUser = data;
                    this.defaultMigrant = {
                      isOfficialRefugee: false,
                      isForcedMigrant: false,
                      isCommonMigrant: false,
                      familyStatus: "Single",
                      amountOfChildren: 0,
                      isEmployed: false,
                      housing: "None",
                      userId: this.newUser.id
                    }
                    this.migrantService.createMigrant(this.defaultMigrant).subscribe(
                      () => {
                        alert("You have created your account, now continue with more detailed migrant information.")
                        this.router.navigate(['/update-migrant', this.newUser.id]);
                      }
                    )
                },
            ); 
          },
          (exception) => {
            this.error = Error.returnErrorMessage(exception);
            
          }
      );
    }

}
  