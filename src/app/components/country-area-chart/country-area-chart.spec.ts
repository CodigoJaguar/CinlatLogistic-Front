import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryAreaChart } from './country-area-chart';

describe('CountryAreaChart', () => {
  let component: CountryAreaChart;
  let fixture: ComponentFixture<CountryAreaChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryAreaChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryAreaChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
