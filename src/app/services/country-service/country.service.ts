import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HELPGETSET_API_URL } from 'src/app/injection/injection-token';

import { GetCountry } from 'src/app/interfaces/country/get-country';
import { GetCountryVersion } from 'src/app/interfaces/country/get-country-version';
import { CreateCountryVersion } from 'src/app/interfaces/country/create-country-version';
import { GetUser } from 'src/app/interfaces/user/get-user';
import { CreateCountry } from 'src/app/interfaces/country/create-country';

@Injectable({
  providedIn: 'root'
})

export class CountryService{

  constructor(private http: HttpClient, 
    @Inject(HELPGETSET_API_URL) private apiUrl: string) { }

    getAllCountries():Observable<GetCountry[]>{
        return this.http.get<GetCountry[]>(`${this.apiUrl}/api/Country/All`)
    }
    
    getCountryById(id: number):Observable<GetCountry>{
        return this.http.get<GetCountry>(`${this.apiUrl}/api/Country/${id}`)
    } 

    getCountryByName(name: number):Observable<GetCountry>{
        return this.http.get<GetCountry>(`${this.apiUrl}/api/Country/Name/${name}`)
    } 

    getUsersFromCountry(id: number):Observable<GetUser>{
        return this.http.get<GetUser>(`${this.apiUrl}/api/Country/UsersFrom/${id}`)
    } 

    getUsersInCountry(id: number):Observable<GetUser>{
        return this.http.get<GetUser>(`${this.apiUrl}/api/Country/UsersIn/${id}`)
    } 

    getAllOrganisations():Observable<GetUser[]>{
        return this.http.get<GetUser[]>(`${this.apiUrl}/api/Country/Organisations`)
    }

    createCountry(countryModel: CreateCountry):Observable<any>{
        return this.http.post(`${this.apiUrl}/api/Country/Add`, countryModel);
    }

    updateCountry(countryVersionModel: CreateCountryVersion):Observable<any>{
        return this.http.put(`${this.apiUrl}/api/Country/ChangeInfo`, countryVersionModel);
    }

    renameCountry(countryModel: GetCountry):Observable<any>{
        return this.http.put(`${this.apiUrl}/api/Country/Rename`, countryModel);
    }

    getVersionById(id: number):Observable<GetCountryVersion>{
        return this.http.get<GetCountryVersion>(`${this.apiUrl}/api/Country/Version/${id}`)
    } 

    getCountryVersionsById(id: number):Observable<GetCountryVersion[]>{
        return this.http.get<GetCountryVersion[]>(`${this.apiUrl}/api/Country/Version/${id}/AllVersions`)
    } 

    getLatestCountryVersionById(id: number):Observable<GetCountryVersion>{
        return this.http.get<GetCountryVersion>(`${this.apiUrl}/api/Country/${id}/LastVersion`)
    } 

    approveVersion(id: number):Observable<any>{
        return this.http.put(`${this.apiUrl}/api/Country/ApproveVersion/${id}`, null);
    }

    disapproveVersion(id: number):Observable<any>{
        return this.http.put(`${this.apiUrl}/api/Country/DisapproveVersion/${id}`, null);
    }

    deleteVersion(id: number):Observable<any>{
        return this.http.delete(`${this.apiUrl}/api/Country/Version/${id}`);
    }

    deleteCountry(id: number):Observable<any>{
        return this.http.delete(`${this.apiUrl}/api/Country/${id}`);
    }

    userAlreadyChecked(id: number):Observable<boolean>{
        return this.http.get<boolean>(`${this.apiUrl}/api/Country/Version/${id}/IsChecked`)
    }

    userApproved(id: number):Observable<boolean>{
        return this.http.get<boolean>(`${this.apiUrl}/api/Country/Version/${id}/IsApproved`)
    }

}
