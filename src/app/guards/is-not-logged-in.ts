import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class IsNotLoggedIn {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean{
    if(this.authService.isAuthenticated()){
      this.router.navigate([''])
    }
    return true;
  }
}