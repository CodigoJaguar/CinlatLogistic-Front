import { Component } from '@angular/core';
import { CountryAreaChart } from "../../components/country-area-chart/country-area-chart";
import { CountryPopulationChart } from '../../components/country-population-chart/country-population-chart';

@Component({
  selector: 'app-home',
  imports: [CountryAreaChart, CountryPopulationChart],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true
})
export class Home {

}
