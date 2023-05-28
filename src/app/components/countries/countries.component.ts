import { Component, OnInit } from "@angular/core";
import { Router,  ActivatedRoute } from "@angular/router";

import { UserService } from "src/app/services/user-service/user.service";
import { AuthService } from "src/app/services/auth-service/auth.service";
import { ChatService } from "src/app/services/chat-service/chat.service";
import { MessageService } from "src/app/services/message-service/message.service";

import { GetUser } from "src/app/interfaces/user/get-user";

import { Error } from "src/app/error-handle/error";
import { GetChat } from "src/app/interfaces/chat/get-chat";
import { FormControl, FormGroup } from "@angular/forms";
import { GetMessage } from "src/app/interfaces/chat/get-message";
import { SendMessage } from "src/app/interfaces/chat/send-message";
import { CountryService } from "src/app/services/country-service/country.service";
import { GetCountry } from "src/app/interfaces/country/get-country";

@Component({
    selector: 'countries',
    templateUrl: './countries.component.html',
    styleUrls: ['./countries.component.css']
})

export class CountriesComponent implements OnInit {

    constructor(private authService: AuthService,
        private countryService: CountryService,
        private route: ActivatedRoute) {
        }
    
    ngOnInit(): void {
        this.countriesError = '';

        this.countryService.getAllCountries().subscribe(
            (data) => {
                this.countries = data;
                this.allCountries = data;
            },
            (exception) =>{
                this.countriesError = Error.returnErrorMessage(exception);
            }
        );

        this.countryForm = new FormGroup({
            countryName: new FormControl(),
            shortName: new FormControl()
        })
    }

    countries: GetCountry[] = [];
    allCountries: GetCountry[] = [];

    countriesError!: string;

    formError!: string;

    countryForm!: FormGroup;

    

    countryByName!: GetCountry;
    countryByShortName!: GetCountry;

    countryToReturn!: GetCountry;

    getCountry(){
        if (this.countryForm.value.countryName && !this.countryForm.value.shortName){
           this.getCountryByName(this.countryForm.value.countryName);
        }
        else if (this.countryForm.value.shortName && !this.countryForm.value.name){
            this.getCountryByShortName(this.countryForm.value.shortName);
        }
        else {
            this.getCountryBothNames(this.countryForm.value.countryName, this.countryForm.value.shortName);
        };
    }

    getCountryByName(name: string): GetCountry{
        this.countryService.getCountryByName(name).subscribe(
            (country) => {
                this.countries = [country];
                this.formError = '';
            },
            (exception) => {
                this.formError = "There is no country with such name."
                this.countries = this.allCountries;
            }
        )
        return this.countryToReturn;
    }

    getCountryByShortName(name: string): GetCountry{
        this.countryService.getCountryByShortName(name).subscribe(
            (country) => {
                this.countries = [country];
                this.formError = '';
            },
            (exception) => {
                this.formError = "There is no country with such short name."
                this.countries = this.allCountries;
            }
        )
        return this.countryToReturn;
    }

    getCountryBothNames(name: string, shortName: string): GetCountry{
        let country = this.getCountryByName(name);
        if (country.id == this.getCountryByShortName(shortName).id){
            this.countries = [country];
            this.formError = '';
        }
        else{
            this.formError = "Name and shortname are not for one country.";
        }
        return this.countryToReturn;
    }
}
  