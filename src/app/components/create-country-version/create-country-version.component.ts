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

@Component({
    selector: 'create-country-version',
    templateUrl: './create-country-version.component.html',
    styleUrls: ['./create-country-version.component.css']
})

export class CreateCountryVersionComponent implements OnInit {

  countryId!: number;
  foundVersion!: GetCountryVersion;
  versionError: string = '';
  versionForm!: FormGroup;
  user!: LoggedUserProfile;

  constructor(private userService: UserService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.countryId = this.route.snapshot.params['id'];
    this.versionForm = new FormGroup({
      userName: new FormControl(),
        registrationInfo: new FormControl(),
        employmentInfo: new FormControl(),
        taxInfo: new FormControl(),
        insuranceInfo: new FormControl(),
        supportInfo: new FormControl()
    })
    this.countryService.getLatestCountryVersionById(this.countryId).subscribe(
      (data) => {
        this.foundVersion = data;
        this.versionForm.setValue({
          registrationInfo: data.registrationInfo,
          employmentInfo: data.employmentInfo,
          taxInfo: data.taxInfo,
          insuranceInfo: data.insuranceInfo,
          supportInfo: data.supportInfo
        })
      }
    )
    
  }

  addNewVewrsion(){
    this.userService.getThisUserProfile().subscribe(
      (user) => {
        this.user = user;
        this.countryService.updateCountry({
          registrationInfo: this.versionForm.value.registrationInfo,
          employmentInfo: this.versionForm.value.employmentInfo,
          taxInfo: this.versionForm.value.taxInfo,
          insuranceInfo: this.versionForm.value.insuranceInfo,
          supportInfo: this.versionForm.value.supportInfo,
          countryId: parseInt(String(this.countryId)),
          authorId: this.user.id,
          authorUsername: this.user.userName,
          usersWhoChecked: [],
          changeTime: new Date()
        }).subscribe(
          () => {
            alert("A new version is created!")
            this.countryService.getLatestCountryVersionById(this.countryId).subscribe(
              (version) => { 
                this.router.navigate(["/country-version", this.countryId])
              },
              (exception) => {
                alert(exception);
              }
            )
          }
        );
      }
    );
    
  }
}
  