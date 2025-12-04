import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryPopulationChart } from './country-population-chart';

describe('CountryPopulationChart', () => {
  let component: CountryPopulationChart;
  let fixture: ComponentFixture<CountryPopulationChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryPopulationChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryPopulationChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
