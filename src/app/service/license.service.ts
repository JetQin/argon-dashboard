import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { License } from '../model/license';
import { PageData } from '../model/page';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<PageData> {
    const params = new HttpParams()
      .set('page', '0')
      .set('size', '10');

    return this.http.get<PageData>(`${environment.apiUrl}/licence/list`, { params });
  }

  create(license: License) {
    return this.http.post(`${environment.apiUrl}/licence/createLicense`, license , httpOptions );
  }

  delete(licenseId: string) {
    const params = new HttpParams()
      .set('licenseId', licenseId);
    return this.http.delete(`${environment.apiUrl}/licence/deleteLicense`, { params });
  }
}
