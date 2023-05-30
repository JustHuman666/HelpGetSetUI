import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "src/app/services/user-service/user.service";

import { Error } from "src/app/error-handle/error";
import { PostService } from "src/app/services/post-service/post.service";
import { GetPost } from "src/app/interfaces/post/get-post";
import { GetUser } from "src/app/interfaces/user/get-user";
import { GetCountry } from "src/app/interfaces/country/get-country";
import { CountryService } from "src/app/services/country-service/country.service";
import { DatePipe } from "@angular/common";
import { VolunteerService } from "src/app/services/volunteer-service/volunteer.service";
import { MigrantService } from "src/app/services/migrant-service/migrant.service";

@Component({
    selector: 'one-user',
    templateUrl: './one.user.component.html',
    styleUrls: ['./one.user.component.css']
})
  

export class OneUserComponent implements OnInit{

    constructor(private userService: UserService,
        private volunteerService: VolunteerService,
        private countryService: CountryService,
        public datepipe: DatePipe,
        private migrantService: MigrantService) {
           
    }
    
    @Input() userId!: number;
    User!: GetUser;
    originalCountry!:  GetCountry;
    currentCountry!: GetCountry;
    isMigrant!: boolean;
    isVolunteer!: boolean;

    ngOnInit(): void {
        this.userService.getUserById(this.userId).subscribe(
            (user) => {
                this.User = user;
                this.countryService.getCountryById(this.User.currentCountryId).subscribe(
                    (country) => {
                        this.currentCountry = country;
                        this.countryService.getCountryById(this.User.originalCountryId).subscribe(
                            (data) => {
                                this.originalCountry = data;
                                this.checkIfMigrant();
                                this.checkIfVolunteer();
                            }
                        );
                    }
                );
            }
        )
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
  