import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

import { UserService } from "src/app/services/user-service/user.service";
import { AuthService } from "src/app/services/auth-service/auth.service";
import { DatePipe } from "@angular/common";
import { GetPost } from "src/app/interfaces/post/get-post";
import { PostService } from "src/app/services/post-service/post.service";
import { LoggedUserProfile } from "src/app/interfaces/user/logged-user-profile";
import { FormControl, FormGroup } from "@angular/forms";
import { GetCountry } from "src/app/interfaces/country/get-country";
import { CountryService } from "src/app/services/country-service/country.service";
import { GetUser } from "src/app/interfaces/user/get-user";
import { VolunteerService } from "src/app/services/volunteer-service/volunteer.service";
import { MigrantService } from "src/app/services/migrant-service/migrant.service";
import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  constructor(private userService: UserService,
    private authService: AuthService,
    private volunteerService: VolunteerService,
    private migrantService: MigrantService,
    public datepipe: DatePipe,
    private countryService: CountryService) {
  }

  
  isLoggedIn!: boolean;

  defaultUsersError: string = '';
  defaultUsers: GetUser[] = [];

  countryUsers: GetUser[] = [];
  countryError: string = '';

  byNameUsers: GetUser[] = [];
  byNameError: string = '';

  volunteers: GetUser[] = [];
  volunteerError: string = '';

  migrants: GetUser[] = [];
  migrantError: string = '';
  
  countries!: GetCountry[];

  countryForm!: FormGroup;

  userForm!: FormGroup;
  userByFullNameForm!: FormGroup;
  volunteerForm!: FormGroup;
  migrantForm!: FormGroup;

  user!: LoggedUserProfile;
  inOrFrom = ["In", "From"];
  volunteerType = ["Can translate", "Has a place", "Organisation"];
  migrantType = ["Official refugee", "Forced migrant", "Common migrant"];

  ngOnInit(): void {
    this.isLoggedIn =  this.authService.isAuthenticated();
    this.countryForm = new FormGroup({
      countryId: new FormControl(),
      inOrFrom: new FormControl()
    });
    this.userForm = new FormGroup({
      username: new FormControl()
    });
    this.userByFullNameForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl()
    });
    this.volunteerForm = new FormGroup({
      countryId: new FormControl(),
      volunteerType: new FormControl()
    });
    this.migrantForm = new FormGroup({
      countryId: new FormControl(),
      migrantType: new FormControl()
    });
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.defaultUsers = users;
        this.defaultUsersError = '';
      },
      (exception) => {
        this.defaultUsersError = "No user found";
      }
    );
    this.countryService.getAllCountries().subscribe(
      (data) => {
        this.countries = data;
      }
    );
    this.getAllMigrants();
    this.getAllVolunteers();
  }
  onTabChange(event: MatTabChangeEvent) {
    const selectedIndex = event.index;
    if (selectedIndex == 0){
      this.getAllUsers();
    }
    else if (selectedIndex == 3){
      this.getAllVolunteers();
    }
    else if (selectedIndex == 4){
      this.getAllMigrants();
    };
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.defaultUsers = users;
        this.defaultUsersError = '';
        if (users.length == 0){
          this.defaultUsersError = "No user found";
        }
      },
      (exception) => {
        this.defaultUsersError = "No user found";
      }
    );
  }

  getUsersByCountry(){
    if(this.countryForm.value.inOrFrom == "In"){
      this.countryService.getUsersInCountry(this.countryForm.value.countryId).subscribe(
        (users) => {
          this.countryUsers = users;
          this.countryError = '';
          if (users.length == 0){
            this.countryError = "No user found";
          }
        },
        (exception) => {
          this.countryError = "No user found";
        }
      );
    } else {
      this.countryService.getUsersFromCountry(this.countryForm.value.countryId).subscribe(
        (users) => {
          this.countryUsers = users;
          this.countryError = '';
          if (users.length == 0){
            this.countryError = "No user found";
          }
        },
        (exception) => {
          this.countryError = "No user found";
        }
      )
    }
  }

  getUserByUserName(){
    this.userService.getUserProfileByUserName(this.userForm.value.username).subscribe(
      (profile) => {
        this.byNameUsers = [profile];
        this.byNameError = '';
      },
      (eception) => {
        this.byNameError = "No user is found";
      }
    );
  }

  getUserByFullName(){
    this.userService.getUserProfilesByFullName(
      this.userByFullNameForm.value.firstName,
      this.userByFullNameForm.value.lastName
      ).subscribe(
      (profiles) => {
        this.byNameUsers = profiles;
        this.byNameError = '';
        if(profiles.length == 0){
          this.byNameError = "No user is found";
        }
      },
      (exception) => {
        this.byNameError = "No user is found";
      }
    );
  }

  getAllVolunteers(){
    this.volunteerService.getAllVolunteers().subscribe(
      (data) => {
        this.volunteers = data;
        this.volunteerError = '';
          if (data.length == 0){
            this.volunteerError = "No user found";
          }
      },
      (exception) => {
        this.volunteerError = "No user found";
      });
  }

  getVolunteersByFilter(){
    let foundVolunteers: GetUser[] = [];
    if(this.volunteerForm.value.volunteerType == "Can translate"){
      this.volunteerService.getAllTranslators().subscribe(
        (data) => {
          data.forEach(volunteer => {
            if(volunteer.currentCountryId == this.volunteerForm.value.countryId){
              foundVolunteers.push(volunteer);
            }
          });
          this.volunteers = foundVolunteers;
          if(foundVolunteers.length == 0){
            this.volunteerError = "No user found"
          };
        }
      );
    }
    else if (this.volunteerForm.value.volunteerType == "Has a place") {
      this.volunteerService.getAllForHousing().subscribe(
        (data) => {
          data.forEach(volunteer => {
            if(volunteer.currentCountryId == this.volunteerForm.value.countryId){
              foundVolunteers.push(volunteer);
            }
          });
          this.volunteers = foundVolunteers;
          if(foundVolunteers.length == 0){
            this.volunteerError = "No user found"
          };
        }
      );
    }
    else if (this.volunteerForm.value.volunteerType == "Organisation") {
      this.volunteerService.getAllOrganisations().subscribe(
        (data) => {
          data.forEach(volunteer => {
            if(volunteer.currentCountryId == this.volunteerForm.value.countryId){
              foundVolunteers.push(volunteer);
            }
          });
          this.volunteers = foundVolunteers;
          if(foundVolunteers.length == 0){
            this.volunteerError = "No user found"
          };
        }
      );
    }
  }

  getAllMigrants(){
    this.migrantService.getAllMigrants().subscribe(
      (data) => {
        this.migrants = data;
        this.migrantError = '';
          if (data.length == 0){
            this.migrantError = "No user found";
          }
      },
      (exception) => {
        this.migrantError = "No user found";
      });
  }
 
  getMigrantsByFilter(){
    let foundMigrants: GetUser[] = [];
    if(this.migrantForm.value.migrantType ==  "Official refugee"){
      this.migrantService.getAllRefugees().subscribe(
        (data) => {
          data.forEach(migrant => {
            if(migrant.currentCountryId == this.migrantForm.value.countryId){
              foundMigrants.push(migrant);
            }
          });
          this.migrants = foundMigrants;
          this.migrantError = "";
          if(foundMigrants.length == 0){
            this.migrantError = "No user found"
          };
        }
      );
    }
    else if (this.migrantForm.value.migrantType == "Forced migrant") {
      this.migrantService.getAllForcedMigrants().subscribe(
        (data) => {
          data.forEach(migrant => {
            if(migrant.currentCountryId == this.migrantForm.value.countryId){
              foundMigrants.push(migrant);
            }
          });
          this.migrants = foundMigrants;
          this.migrantError = "";
          if(foundMigrants.length == 0){
            this.migrantError = "No user found"
          };
        }
      );
    }
    else if (this.migrantForm.value.migrantType == "Common migrant") {
      this.migrantService.getAllCommonMigrants().subscribe(
        (data) => {
          data.forEach(migrant => {
            if(migrant.currentCountryId == this.migrantForm.value.countryId){
              foundMigrants.push(migrant);
              this.migrantError = "";
            }
          });
          this.migrants = foundMigrants;
          if(foundMigrants.length == 0){
            this.migrantError = "No user found"
          };
        }
      );
    }
  }
}
  