import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HELPGETSET_API_URL } from 'src/app/injection/injection-token';

import { GetUser } from 'src/app/interfaces/user/get-user';
import { LoggedUserProfile } from 'src/app/interfaces/user/logged-user-profile';
import { UpdateUser } from 'src/app/interfaces/user/update-user';
import { ChangePassword } from 'src/app/interfaces/profile_info/change-password';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, 
    @Inject(HELPGETSET_API_URL) private apiUrl: string) { }

  getAllUsers():Observable<GetUser[]>{
      return this.http.get<GetUser[]>(`${this.apiUrl}/api/User/All`)
  }  

  getUserById(id : number):Observable<GetUser>{
    return this.http.get<GetUser>(`${this.apiUrl}/api/User/${id}`);
  }

  getUserRoles():Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}/api/User/Roles`);
  }

  getThisUserProfile():Observable<LoggedUserProfile>{
    return this.http.get<LoggedUserProfile>(`${this.apiUrl}/api/User/MyProfile`);
  }

  changeUserPassword(changePassword: ChangePassword):Observable<any>{
    return this.http.put(`${this.apiUrl}/api/User/ChangePassword`, changePassword);
  }

  getUserProfileByUserName(userName: string):Observable<GetUser>{
    return this.http.get<GetUser>(`${this.apiUrl}/api/User/ByUserName/${userName}`);
  }

  getUserProfilesByFullName(firstName: string, lastName: string):Observable<GetUser[]>{
    return this.http.get<GetUser[]>(`${this.apiUrl}/api/User/AllByFullName/${firstName}/${lastName}`);
  }

  getUserProfileByPhone(phone: string):Observable<GetUser>{
    return this.http.get<GetUser>(`${this.apiUrl}/api/User/ByPhone/${phone}`);
  }

  addUserToRole(id: number, role: string):Observable<any>{
    return this.http.post(`${this.apiUrl}/api/User/AddRole/${id}/${role}`, null);
  }

  updateThisUserInfo(newInfo: UpdateUser):Observable<GetUser>{
    return this.http.put<GetUser>(`${this.apiUrl}/api/User/MyInfo`, newInfo);
  }

  updateUserInfoById(id: number, newInfo: UpdateUser):Observable<GetUser>{
    return this.http.put<GetUser>(`${this.apiUrl}/api/User/UserInfo/${id}`, newInfo);
  }

  deleteThisUser():Observable<any>{
    return this.http.delete(`${this.apiUrl}/api/User/MyAccount`);
  }

  deleteUserById(id: number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/api/User/ByAdmin/${id}`);
  }

  setOriginalCountry(id: number):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/api/User/OriginalCountry/${id}`, null);
  }

  setCurrentCountry(id: number):Observable<GetUser>{
    return this.http.put<any>(`${this.apiUrl}/api/User/CurrentCountry/${id}`, null);
  }
}
