import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CONSTANT } from '../common/constant';

@Injectable({
  providedIn: 'root'
})
export class JwtService implements HttpInterceptor {

  constructor(private helper: JwtHelperService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const access_token = localStorage.getItem(CONSTANT.ACCESS_TOKEN);
    const isExpired = this.helper.isTokenExpired(access_token);
    if (access_token && !isExpired) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`
        }
      });
    }

    return next.handle(request);
  }
}
