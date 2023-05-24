import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HELPGETSET_API_URL } from 'src/app/injection/injection-token';

import { Volunteer } from 'src/app/interfaces/volunteer/volunteer';

@Injectable({
  providedIn: 'root'
})

export class VolunteerService{

  constructor(private http: HttpClient, 
    @Inject(HELPGETSET_API_URL) private apiUrl: string) { }

    getAllVolunteers():Observable<Volunteer[]>{
        return this.http.get<Volunteer[]>(`${this.apiUrl}/api/Volunteer/All`)
    }

    
    getVolunteerById(id: number):Observable<Volunteer>{
        return this.http.get<Volunteer>(`${this.apiUrl}/api/Volunteer/${id}`)
    } 

    getVolunteerByUserId(id: number):Observable<Volunteer>{
        return this.http.get<Volunteer>(`${this.apiUrl}/api/Volunteer/ByUserId/${id}`)
    } 

    getAllOrganisations():Observable<Volunteer[]>{
        return this.http.get<Volunteer[]>(`${this.apiUrl}/api/Volunteer/Organisations`)
    }

    getAllTranslators():Observable<Volunteer[]>{
        return this.http.get<Volunteer[]>(`${this.apiUrl}/api/Volunteer/Translators`)
    }

    getAllCommonVolunteers():Observable<Volunteer[]>{
        return this.http.get<Volunteer[]>(`${this.apiUrl}/api/Volunteer/AllCommon`)
    }

    getAllForHousing():Observable<Volunteer[]>{
        return this.http.get<Volunteer[]>(`${this.apiUrl}/api/Volunteer/ForHousing`)
    }

    createVolunteer(VolunteerModel: Volunteer):Observable<any>{
        return this.http.post(`${this.apiUrl}/api/Volunteer/New`, VolunteerModel);
    }

    updateVolunteer(VolunteerModel: Volunteer):Observable<any>{
        return this.http.put(`${this.apiUrl}/api/Volunteer/Update`, VolunteerModel);
    }

    deleteVolunteer(id: number):Observable<any>{
        return this.http.delete(`${this.apiUrl}/api/Volunteer/${id}`);
    }
}
