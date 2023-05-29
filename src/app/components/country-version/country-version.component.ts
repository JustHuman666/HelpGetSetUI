import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';

import { UserService } from "src/app/services/user-service/user.service";
import { AuthService } from "src/app/services/auth-service/auth.service";
import { Error } from "src/app/error-handle/error";
import { CountryService } from "src/app/services/country-service/country.service";
import { GetUser } from "src/app/interfaces/user/get-user";
import { LoggedUserProfile } from "src/app/interfaces/user/logged-user-profile";
import { GetCountryVersion } from "src/app/interfaces/country/get-country-version";
import { GetCountry } from "src/app/interfaces/country/get-country";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'country-version',
    templateUrl: './country-version.component.html',
    styleUrls: ['./country-version.component.css']
})

export class CountryVersionComponent implements OnInit {

  countryId!: number;
  versionId!: number;
  foundVersion!: GetCountryVersion;
  versionError: string = '';
  foundCountry!: GetCountry;
  allVersions!: GetCountryVersion[];
  versionsForm!: FormGroup;

  constructor(private userService: UserService,
    private authService: AuthService,
    private countryService: CountryService,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.countryId = this.route.snapshot.params['id'];
    this.isLoggedIn =  this.authService.isAuthenticated();
    this.countryService.getCountryById(this.countryId).subscribe(
      (country) => {
        this.foundCountry = country;
      }
    );
    if(this.route.snapshot.params['version_id']){
      this.countryService.getVersionById(this.versionId).subscribe(
        (data) => {
          this.foundVersion = data;
        },
        (exception) => {
          this.versionError = "There is no information about the country. If you are logged in, you can add one.";
        }
      )
    }
    else {
      this.countryService.getLatestCountryVersionById(this.countryId).subscribe(
        (data) => {
          this.foundVersion = data;
          this.isAlreadyChecked();
        },
        (exception) => {
          this.versionError = "There is no information about the country. If you are logged in, you can add one.";
        }
      )
    };
    this.countryService.getCountryVersionsById(this.countryId).subscribe(
      (versions) => {
        this.allVersions = versions;
      }
    );
    this.versionsForm = new FormGroup({
      version: new FormControl()
    });
    
  }
  isLoggedIn!: boolean;

  public get versionIsFound() : boolean {
    return typeof this.foundVersion !== "undefined";
  }

  getSpecificVersion(){
    this.foundVersion = this.versionsForm.value.version;
    this.isAlreadyChecked();
  }

  alreadyChecked!: boolean;

  isAlreadyChecked(){
    if(this.isLoggedIn){
      this.countryService.userAlreadyChecked(this.foundVersion.id).subscribe(
        (data) => {
          this.alreadyChecked = data;
        }
      );
    }
    else{
     this.alreadyChecked = false;
    }
  }

  approve(){
    this.countryService.approveVersion(this.foundVersion.id).subscribe(
      () => {
        this.foundVersion.approvesAmount += 1;
        this.isAlreadyChecked();
      }
    )
  }

  disapprove(){
    this.countryService.disapproveVersion(this.foundVersion.id).subscribe(
      () => {
        this.foundVersion.disApprovesAmount += 1;
        this.isAlreadyChecked();
      }
    )
  }
}
  