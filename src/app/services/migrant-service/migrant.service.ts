import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HELPGETSET_API_URL } from 'src/app/injection/injection-token';

import { Migrant } from 'src/app/interfaces/migrant/migrant';
import { CreateMigrant } from 'src/app/interfaces/migrant/create-migrant';
import { GetUser } from 'src/app/interfaces/user/get-user';

@Injectable({
  providedIn: 'root'
})

export class MigrantService{

  constructor(private http: HttpClient, 
    @Inject(HELPGETSET_API_URL) private apiUrl: string) { }

    getAllMigrants():Observable<GetUser[]>{
        return this.http.get<GetUser[]>(`${this.apiUrl}/api/Migrant/All`)
    }

    getMigrantById(id: number):Observable<Migrant>{
        return this.http.get<Migrant>(`${this.apiUrl}/api/Migrant/${id}`)
    } 

    getMigrantByUserId(id: number):Observable<Migrant>{
        return this.http.get<Migrant>(`${this.apiUrl}/api/Migrant/ByUserID/${id}`)
    } 

    getAllRefugees():Observable<GetUser[]>{
        return this.http.get<GetUser[]>(`${this.apiUrl}/api/Migrant/Refugees`)
    }

    getAllForcedMigrants():Observable<GetUser[]>{
        return this.http.get<GetUser[]>(`${this.apiUrl}/api/Migrant/AllForced`)
    }

    getAllCommonMigrants():Observable<GetUser[]>{
        return this.http.get<GetUser[]>(`${this.apiUrl}/api/Migrant/AllCommon`)
    }

    getHousingByUserId(id: number):Observable<string>{
        return this.http.get<string>(`${this.apiUrl}/api/Migrant/${id}/Housing`)
    } 

    getFamilyStatusByUserId(id: number):Observable<string>{
        return this.http.get<string>(`${this.apiUrl}/api/Migrant/${id}/FamilyStatus`)
    } 

    createMigrant(migrantModel: CreateMigrant):Observable<any>{
        return this.http.post(`${this.apiUrl}/api/Migrant/New`, migrantModel);
    }

    updateMigrant(migrantModel: Migrant):Observable<any>{
        return this.http.put(`${this.apiUrl}/api/Migrant/Update`, migrantModel);
    }

    deleteMigrant(id: number):Observable<any>{
        return this.http.delete(`${this.apiUrl}/api/Migrant/${id}`);
    }

    isUserEmployed(id: number):Observable<boolean>{
        return this.http.get<boolean>(`${this.apiUrl}/api/Migrant/${id}/IsEmployed`)
    }

    isMigrant(id: number):Observable<boolean>{
        return this.http.get<boolean>(`${this.apiUrl}/api/Migrant/${id}/Exists`)
    }
}
