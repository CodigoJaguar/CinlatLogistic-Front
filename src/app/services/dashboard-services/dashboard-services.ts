import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryArea } from '../../interfaces/countryArea';

@Injectable({
  providedIn: 'root'
})
export class DashboardServices {
  private readonly relativeUrl = '/api/dashboard';
  private readonly fullUrl = new URL(this.relativeUrl, window.location.origin).href;
  

  constructor(private http: HttpClient) {}

  getCountriesArea(): Observable<CountryArea[]> {
    console.log('POST URL CountryArea:', this.fullUrl);
    return this.http.get<CountryArea[]>(this.fullUrl);
  }
  
}
