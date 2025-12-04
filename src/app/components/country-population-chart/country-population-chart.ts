import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, signal, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { DashboardServices } from './../../services/dashboard-services/dashboard-services';
import { CountryPopulation } from '../../interfaces/countryPopulation';

Chart.register(...registerables);

@Component({
  selector: 'app-country-population-chart',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './country-population-chart.html',
  styleUrl: './country-population-chart.scss',
  standalone: true
})
export class CountryPopulationChart implements OnInit, OnDestroy, AfterViewInit{

  @ViewChild('chartCanvas', { static: false }) chartCanvas?: ElementRef<HTMLCanvasElement>;


  populationData = signal<CountryPopulation[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  private chart?: Chart;

  constructor(private dashboardService: DashboardServices) {}


  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  
  loadData(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const mockData: CountryPopulation[] = [
    { commonName: "Aruba", population: 180 },
    { commonName: "Afghanistan", population: 652230 },
    { commonName: "Angola", population: 1246700 },
    { commonName: "Anguilla", population: 91 },
    { commonName: "Åland Islands", population: 1580 }
  ];


    this.dashboardService.getCountriesPopulation().subscribe({
      next: (data: CountryPopulation[]) => {
        console.log('✅ Datos recibidos:', data);
        this.populationData.set(data);
        this.isLoading.set(false);

        // Si el view está listo, crear la gráfica; si no, ngAfterViewInit la iniciará
        // if (this.chartCanvas?.nativeElement) {
        //   console.log("Creating chart after data load");
        //   setTimeout(() => this.createChart(), 0);
        // }
      },
      error: (error) => {
        console.error('❌ Error obteniendo datos:', error);
        this.errorMessage.set('Error al cargar los datos. Por favor, intenta de nuevo.');
        this.isLoading.set(false);
      }
    });
  }

  

  private createChart(): void {
    
    if (this.chart) {
      this.chart.destroy();
    }

    const data = this.populationData();

    const labels = data.map(country => country.commonName);
    const areas = data.map(country => country.population);

    // Configuración de la gráfica
    const config: ChartConfiguration = {
      type: 'bar' as ChartType,
      data: {
        labels: labels,
        datasets: [{
          label: 'Personas',
          data: areas,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          borderRadius: 4,
          hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y' as const,
        plugins: {
          title: {
            display: true,
            text: 'Poblacion de Países',
            font: {
              size: 18,
              weight: 'bold'
            }
          },
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.parsed.x;
                return `Personas: ${value?.toString()} `;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Personas',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45,
              font: {
                size: 11
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Pais',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            beginAtZero: true,
            ticks: {
              maxRotation: 0,
                    minRotation: 0,
                    font: {
                        size: 11
                    }
            }
          }
        }
      }
    };

    // Crear la gráfica
    const canvas = this.chartCanvas?.nativeElement;
    if (!canvas) {
      console.warn('Canvas not available yet — chart creation skipped');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, config);
      console.log('✅ Gráfica creada exitosamente');
    }else{
      console.error('❌ No se pudo obtener el contexto 2D del canvas');
    }
  }


  ngAfterViewInit(): void {

    setTimeout(() => {
      if (this.chartCanvas) {
        const ctx = this.chartCanvas.nativeElement.getContext('2d');
        if (ctx) {
          this.createChart();
        } else {
          console.error("ERROR: No se pudo obtener el contexto 2D del Canvas.");
        }
      } else {
        console.error("ERROR: El elemento #chartCanvas no fue encontrado por @ViewChild.");
      }
    }, 100); 

    
  }

  
  
  
  getTotalPopulation(): number {
    return this.populationData().reduce((sum, country) => sum + country.population, 0);
  }


  getAveragePopulation(): number {
    const data = this.populationData();
    if (data.length === 0) return 0;
    return this.getTotalPopulation() / data.length;
  }


}
