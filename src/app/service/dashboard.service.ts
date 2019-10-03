import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import {Metric} from '../model/metric';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getMetric(): Observable<Metric> {
    return this.http.get<Metric>(`${environment.apiUrl}/metric/dashboard`);
  }
}
