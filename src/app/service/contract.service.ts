import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract } from '../model/contract';
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
export class ContractService {

  constructor(private http: HttpClient) { }

  list(page: number): Observable<PageData> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', '10');

    return this.http.get<PageData>(`${environment.apiUrl}/contract/list`, { params });
  }

  uploadContract(file: any) {

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

  create(contract: Contract): Observable<Response> {
    return this.http.post<Response>(`${environment.apiUrl}/contract/createContract`, contract , httpOptions );
  }

  delete(contractId: string) {
    const params = new HttpParams()
      .set('contractId', contractId);
    return this.http.delete(`${environment.apiUrl}/contract/deleteContract`, { params });
  }
}
