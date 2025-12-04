import { Component } from '@angular/core';
import { CountryAreaChart } from "../../components/country-area-chart/country-area-chart";

@Component({
  selector: 'app-home',
  imports: [CountryAreaChart],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true
})
export class Home {

}
