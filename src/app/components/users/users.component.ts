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
    this.countryService.getAllCountries().subscribe(
      (data) => {
        this.countries = data;
        this.userService.getAllUsers().subscribe(
          (users) => {
            this.defaultUsers = users;
            this.defaultUsersError = '';
            this.getAllMigrants();
            this.getAllVolunteers();
          },
          (exception) => {
            this.defaultUsersError = "No user found";
          }
        );
      }
    )
  }
  updateAll(){
    this.getAllUsers();
    this.getAllMigrants();
    this.getAllVolunteers();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.defaultUsers = users;
        this.defaultUsersError = '';
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
        },
        (exception) => {
          this.countryError = "No user found";
        }
      );
    } else {
      this.countryService.getUsersFromCountry(this.countryForm.value.countryId).subscribe(
        (users) => {
          this.countryUsers = users;
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

  fullNameError = ''
  getUserByFullName(){
    this.userService.getUserProfilesByFullName(
      this.userByFullNameForm.value.firstName,
      this.userByFullNameForm.value.lastName
      ).subscribe(
      (profiles) => {
        this.byNameUsers = profiles;
        this.fullNameError = '';
        if(profiles.length == 0){
          this.fullNameError = "No user is found";
        }
      },
      (exception) => {
        this.fullNameError = "No user is found";
      }
    );
  }

  getAllVolunteers(){
    let foundVolunteers: GetUser[] = [];
    this.volunteerService.getAllVolunteers().subscribe(
      (data) => {
        data.forEach(volunteer => {
          this.userService.getUserById(volunteer.userId).subscribe(
            (profile) => {
              foundVolunteers.push(profile);
            },
            (exception) => {
              this.volunteerError = "No user found";
            }
          )
        });
        this.volunteers = foundVolunteers;
      }
    )
  }

  getVolunteersByFilter(){
    let foundVolunteers: GetUser[] = [];
    if(this.volunteerForm.value.volunteerType == "Can translate"){
      this.volunteerService.getAllTranslators().subscribe(
        (data) => {
          data.forEach(volunteer => {
            this.userService.getUserById(volunteer.userId).subscribe(
              (profile) => {
                if(profile.currentCountryId == this.volunteerForm.value.countryId)
                {
                  foundVolunteers.push(profile);
                }
              }
            );
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
            this.userService.getUserById(volunteer.userId).subscribe(
              (profile) => {
                if(profile.currentCountryId == this.volunteerForm.value.countryId)
                {
                  foundVolunteers.push(profile);
                }
              }
            );
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
            this.userService.getUserById(volunteer.userId).subscribe(
              (profile) => {
                if(profile.currentCountryId == this.volunteerForm.value.countryId)
                {
                  foundVolunteers.push(profile);
                }
              }
            );
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
    let foundMigrants: GetUser[] = [];
    this.migrantService.getAllMigrants().subscribe(
      (data) => {
        data.forEach(migrant => {
          this.userService.getUserById(migrant.userId).subscribe(
            (profile) => {
              foundMigrants.push(profile);
            }
          )
        });
        this.migrants = foundMigrants;
        if(foundMigrants.length == 0){
          this.volunteerError = "No user found"
        };
      }
    )
  }
 
  getMigrantsByFilter(){
    let foundMigrants: GetUser[] = [];
    if(this.migrantForm.value.migrantType ==  "Official refugee"){
      this.migrantService.getAllRefugees().subscribe(
        (data) => {
          data.forEach(migrant => {
            this.userService.getUserById(migrant.userId).subscribe(
              (profile) => {
                if(profile.currentCountryId == this.migrantForm.value.countryId)
                {
                  foundMigrants.push(profile);
                }
              }
            );
          });
          this.migrants = foundMigrants;
          if(foundMigrants.length == 0){
            this.volunteerError = "No user found"
          };
        }
      );
    }
    else if (this.migrantForm.value.migrantType == "Forced migrant") {
      this.migrantService.getAllForcedMigrants().subscribe(
        (data) => {
          data.forEach(migrant => {
            this.userService.getUserById(migrant.userId).subscribe(
              (profile) => {
                if(profile.currentCountryId == this.migrantForm.value.countryId)
                {
                  foundMigrants.push(profile);
                }
              }
            );
          });
          this.volunteers = foundMigrants;
          if(foundMigrants.length == 0){
            this.volunteerError = "No user found"
          };
        }
      );
    }
    else if (this.migrantForm.value.migrantType == "Common migrant") {
      this.migrantService.getAllCommonMigrants().subscribe(
        (data) => {
          data.forEach(migrant => {
            this.userService.getUserById(migrant.userId).subscribe(
              (profile) => {
                if(profile.currentCountryId == this.migrantForm.value.countryId)
                {
                  foundMigrants.push(profile);
                }
              }
            );
          });
          this.migrants = foundMigrants;
          if(foundMigrants.length == 0){
            this.volunteerError = "No user found"
          };
        }
      );
    }
  }
}
  