import { Injectable, Inject } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.auth.getUserToken();
    if(token !== ''){
        request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
    }
    return next.handle(request);
  }
}