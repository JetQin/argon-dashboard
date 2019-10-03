import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { License } from '../model/license';
import { PageData } from '../model/page';
import { Response } from '../model/common';
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

  list(page: number): Observable<PageData> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', '10');

    return this.http.get<PageData>(`${environment.apiUrl}/licence/list`, { params });
  }

  uploadLicense(file: any) {

    const formData = new FormData();
    // tslint:disable-next-line:no-any
    // @ts-ignore
    formData.append('file', file);
    // You can use any AJAX library you like
    const req = new HttpRequest('POST', `${environment.apiUrl}/files/upload`, formData, {
      // reportProgress: true
    });
    return this.http.request(req);
  }

  create(license: License): Observable<Response> {
    return this.http.post<Response>(`${environment.apiUrl}/licence/createLicense`, license , httpOptions );
  }

  delete(licenseId: string) {
    const params = new HttpParams()
      .set('licenseId', licenseId);
    return this.http.delete(`${environment.apiUrl}/licence/deleteLicense`, { params });
  }

  download(licenseId: string) {
    const downloadOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
      }),
      params: new HttpParams()
        .set('licenseId', licenseId)
    };
    // const params = new HttpParams()
    //   .set('licenseId', licenseId);
    return this.http.get(`${environment.apiUrl}/licence/download`,  downloadOptions );
  }
}
