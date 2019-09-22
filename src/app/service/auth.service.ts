import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONSTANT } from '../common/constant';
import { User, LoginResponse } from '../model/users';
import { environment } from '../../environments/environment';
import {tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8',
    'Authorization': 'Basic '.concat(btoa('clientId:secret'))
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  private handleSuccess(resp: LoginResponse) {
    if (!resp.access_token) {
      return false;
    }
    localStorage.setItem(CONSTANT.ACCESS_TOKEN, resp.access_token);
    localStorage.setItem(CONSTANT.REFRESH_TOKEN, resp.refresh_token);
    return true;
  }

  private handleFailed(resp: LoginResponse) {
    console.log(resp);
  }

  public login(user: User) {

    // @ts-ignore
    // tslint:disable-next-line:max-line-length
   return this.http.post(`${environment.apiUrl}/oauth/token`, `username=${user.username}&password=${user.password}&grant_type=${user.grant_type}`, httpOptions)
      .pipe(
        tap((data: LoginResponse) => this.handleSuccess(data)
        )
    );
  }

  public logout() {
    localStorage.removeItem(CONSTANT.ACCESS_TOKEN);
    localStorage.removeItem(CONSTANT.REFRESH_TOKEN);
  }
}
