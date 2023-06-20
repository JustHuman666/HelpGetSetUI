import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HELPGETSET_API_URL } from 'src/app/injection/injection-token';

import { GetPost } from 'src/app/interfaces/post/get-post';
import { CreatePost } from 'src/app/interfaces/post/create-post';

@Injectable({
  providedIn: 'root'
})

export class PostService{

  constructor(private http: HttpClient, 
    @Inject(HELPGETSET_API_URL) private apiUrl: string) { }

    getAllPosts():Observable<GetPost[]>{
        return this.http.get<GetPost[]>(`${this.apiUrl}/api/Post/All`)
    }

    getPostById(id: number):Observable<GetPost>{
        return this.http.get<GetPost>(`${this.apiUrl}/api/Post/${id}`)
    } 

    getPostsByUserId(id: number):Observable<GetPost[]>{
        return this.http.get<GetPost[]>(`${this.apiUrl}/api/Post/AllOfUser/${id}`)
    } 

    getPostsByCountryId(id: number):Observable<GetPost[]>{
        return this.http.get<GetPost[]>(`${this.apiUrl}/api/Post/AllOfCountry/${id}`)
    } 

    createPost(postModel: CreatePost):Observable<any>{
        return this.http.post(`${this.apiUrl}/api/Post/New`, postModel);
    }
    
    updatePost(PostModel: GetPost):Observable<any>{
        return this.http.put(`${this.apiUrl}/api/Post/Update`, PostModel);
    }

    getSuitablePosts(ipAddress: string):Observable<GetPost[]>{
        return this.http.get<GetPost[]>(`${this.apiUrl}/api/Post/Suitable/${ipAddress}`)
    } 

    getVolunteersPosts():Observable<GetPost[]>{
        return this.http.get<GetPost[]>(`${this.apiUrl}/api/Post/AllOfVolunteers`)
    } 

    getVolunteersPostsByCountry(id: number):Observable<GetPost[]>{
        return this.http.get<GetPost[]>(`${this.apiUrl}/api/Post/Volunteers/ByCountry/${id}`)
    } 

    getMigrantsPosts():Observable<GetPost[]>{
        return this.http.get<GetPost[]>(`${this.apiUrl}/api/Post/AllOfMigrants`)
    } 

    getMigrantsPostsByCountry(id: number):Observable<GetPost[]>{
        return this.http.get<GetPost[]>(`${this.apiUrl}/api/Post/Migrants/ByCountry/${id}`)
    } 

    deletePost(id: number):Observable<any>{
        return this.http.delete(`${this.apiUrl}/api/Post/${id}`);
    }
}
