import { Component, Input, OnInit } from "@angular/core";

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

    constructor(private volunteerService: VolunteerService,
        private countryService: CountryService,
        public datepipe: DatePipe,
        private migrantService: MigrantService) {
           
    }
    
    @Input() user!: GetUser;
    originalCountry!:  GetCountry;
    currentCountry!: GetCountry;
    isMigrant!: boolean | null;

    ngOnInit(): void {
        this.checkIfMigrantOrVolunteer();
    }

    checkIfMigrantOrVolunteer(){
        this.migrantService.isMigrant(this.user.id).subscribe(
            (data) => {
                this.isMigrant = data;
            }
        );
    }
}
  