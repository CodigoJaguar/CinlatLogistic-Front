import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryArea } from '../../interfaces/countryArea';
import { CountryPopulation } from '../../interfaces/countryPopulation';

@Injectable({
  providedIn: 'root'
})
export class DashboardServices {
  private readonly relativeUrl_area = '/api/dashboard/area';
  private readonly fullUrl_area = new URL(this.relativeUrl_area, window.location.origin).href;

  private readonly relativeUrl_population = '/api/dashboard/population';
  private readonly fullUrl_population = new URL(this.relativeUrl_population, window.location.origin).href;
  

  constructor(private http: HttpClient) {}

  getCountriesArea(): Observable<CountryArea[]> {
    console.log('POST URL CountryArea:', this.fullUrl_area);
    return this.http.get<CountryArea[]>(this.fullUrl_area);
  }


  getCountriesPopulation(): Observable<CountryPopulation[]> {
    console.log('POST URL CountryPopulation:', this.fullUrl_population);
    return this.http.get<CountryPopulation[]>(this.fullUrl_population);
  }
  
}
