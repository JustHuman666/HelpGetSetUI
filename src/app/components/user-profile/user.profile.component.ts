import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { UserService } from "src/app/services/user-service/user.service";

import { GetUser } from "src/app/interfaces/user/get-user";

import { DatePipe } from "@angular/common";
import { GetCountry } from "src/app/interfaces/country/get-country";
import { CountryService } from "src/app/services/country-service/country.service";
import { MigrantService } from "src/app/services/migrant-service/migrant.service";
import { VolunteerService } from "src/app/services/volunteer-service/volunteer.service";
import { Volunteer } from "src/app/interfaces/volunteer/volunteer";
import { Migrant } from "src/app/interfaces/migrant/migrant";

@Component({
    selector: 'user-profile',
    templateUrl: './user.profile.component.html',
    styleUrls: ['./user.profile.component.css']
})
  

export class UserProfileComponent implements OnInit{

    constructor(private userService: UserService,
        private countryService: CountryService,
        private migrantService: MigrantService,
        private volunteerService: VolunteerService,
        private route: ActivatedRoute,
        public datepipe: DatePipe,
        private router: Router) {
           
    }
    ngOnInit(): void {
        this.userId = this.route.snapshot.params['id'];
        
        this.userService.getUserById(this.userId).subscribe(
            (data) => {
                this.foundUser = data;
                this.countryService.getCountryById(this.foundUser.currentCountryId).subscribe(
                    (data) => {
                        this.currentCountry = data;
                    }
                )
        
                this.countryService.getCountryById(this.foundUser.originalCountryId).subscribe(
                    (data) => {
                        this.originalCountry = data;
                    }
                )
            }
        );
        this.checkIfMigrant();
        this.checkIfVolunteer();

        
    }

    foundUser!: GetUser;

    currentCountry!: GetCountry;
    originalCountry!: GetCountry;
    volunteer!: Volunteer;
    migrant!: Migrant;
    isMigrant: boolean = false;
    isVolunteer: boolean = false;

    userId!: number;

    checkIfMigrant(){
        this.migrantService.getMigrantByUserId(this.userId).subscribe(
            (data) => {
                if(data.id > 0){
                    this.isMigrant = true;
                    this.migrant = data
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
                    this.volunteer = data
                }
                
            }
        );
        this.isVolunteer = false;
    }

}
  