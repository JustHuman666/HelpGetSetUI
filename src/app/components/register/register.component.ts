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
import { RegisterUser } from "src/app/interfaces/user/register-user";
import { CreateMigrant } from "src/app/interfaces/migrant/create-migrant";
import { CreateVolunteer } from "src/app/interfaces/volunteer/create-volunteer";

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  currentDate: string;
  genders: string[];
  countries: string[];

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
      this.countries = [];
      this.countryService.getAllCountries().subscribe(
        (data) => {
          data.forEach(country => {
            this.countries.push(country.name)
          });
        }
      )
    }

    registerForm!: FormGroup;

    error!: string;

    newUser!: GetUser;

    defaultMigrant!: CreateMigrant;

    defaultVolunteer!: CreateVolunteer;

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
        this.countryService.getCountryByName(this.registerForm.value.currentCountry).subscribe(
          (current) => {
            this.currentCountryId = current.id;
            this.authService.register({
              phoneNumber: this.registerForm.value.phoneNumber,
              userName: this.registerForm.value.userName,
              firstName: this.registerForm.value.firstName,
              lastName: this.registerForm.value.lastName,
              password: this.registerForm.value.password,
              birthday: this.registerForm.value.birthday,
              gender: this.registerForm.value.gender,
              originalCountryId: this.originalCountryId,
              currentCountryId: this.currentCountryId
            }).subscribe(
                () => {
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
        )
      }
    )
  }

  registerVolunteer(){
    this.countryService.getCountryByName(this.registerForm.value.originalCountry).subscribe(
      (data) => {
        this.originalCountryId = data.id;
        this.countryService.getCountryByName(this.registerForm.value.currentCountry).subscribe(
          (data) => {
            this.currentCountryId = data.id;
            this.authService.register({
              phoneNumber: this.registerForm.value.phoneNumber,
              userName: this.registerForm.value.userName,
              firstName: this.registerForm.value.firstName,
              lastName: this.registerForm.value.lastName,
              password: this.registerForm.value.password,
              birthday: this.registerForm.value.birthday,
              gender: this.registerForm.value.gender,
              originalCountryId: this.originalCountryId,
              currentCountryId: this.currentCountryId
            }).subscribe(
                () => {
                    this.userService.getUserProfileByUserName(this.registerForm.value.userName).subscribe(
                      (data) => {
                          this.newUser = data;
                          this.defaultVolunteer = {
                            isATranslator: false,
                            isOrganisation: false,
                            hasAPlace: false,
                            userId: this.newUser.id
                          }
                          this.volunteerServidce.createVolunteer(this.defaultVolunteer).subscribe(
                            () => {
                              alert("You have created your account, now continue with more detailed volunteer information.")
                              this.router.navigate(['/update-volunteer', this.newUser.id]);
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
        )
      },
      (exception) => {
        this.error = Error.returnErrorMessage(exception);
      }
    )
  }
}
  