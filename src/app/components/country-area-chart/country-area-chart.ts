import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, signal, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { DashboardServices } from './../../services/dashboard-services/dashboard-services';
import { CountryArea } from './../../interfaces/countryArea';

Chart.register(...registerables);

@Component({
  selector: 'app-country-area-chart',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './country-area-chart.html',
  styleUrl: './country-area-chart.scss',
  standalone: true
})
export class CountryAreaChart implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild('chartCanvas', { static: false }) chartCanvas?: ElementRef<HTMLCanvasElement>;


  

  countriesData = signal<CountryArea[]>([]);
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

    const mockData: CountryArea[] = [
    { commonName: "Aruba", area: 180 },
    { commonName: "Afghanistan", area: 652230 },
    { commonName: "Angola", area: 1246700 },
    { commonName: "Anguilla", area: 91 },
    { commonName: "Åland Islands", area: 1580 }
  ];


    this.dashboardService.getCountriesArea().subscribe({
      next: (data: CountryArea[]) => {
        console.log('✅ Datos recibidos:', data);
        this.countriesData.set(data);
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

  public emptyChartConfig: ChartConfiguration = {
    type: 'bar', // Puede ser 'bar', 'line', 'pie', lo que sea
    data: {
      labels: [], // ¡Etiquetas vacías!
      datasets: [ // ¡Datasets vacíos!
        { 
          label: 'Datos Vacíos', // Al menos el label se mostrará en la leyenda
          data: [], // Sin datos
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: '¡Canvas Vacío, pero el Chart.js funciona! 🎉' // Título para que se vea algo
        },
        legend: {
          display: true // Asegúrate de que la leyenda esté visible para ver el label
        }
      },
      scales: {
        x: { display: true, title: { display: true, text: 'Eje X' } },
        y: { display: true, title: { display: true, text: 'Eje Y' } }
      }
    }
  };

  public chartConfig: ChartConfiguration = {
    type: 'bar', // Tipo de gráfico
    data: {
      labels: [ 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024' ],
      datasets: [
        { 
          data: [ 65, 59, 80, 81 ], 
          label: 'Serie A (Norte)',
          backgroundColor: 'rgba(66, 165, 245, 0.5)',
          borderColor: '#1976D2',
          borderWidth: 1
        },
        { 
          data: [ 28, 48, 40, 19 ], 
          label: 'Serie B (Sur)',
          backgroundColor: 'rgba(255, 167, 38, 0.5)',
          borderColor: '#F57C00',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Ventas Trimestrales (Chart.js puro)'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  private createChart(): void {
    
    if (this.chart) {
      this.chart.destroy();
    }

    const data = this.countriesData();

    const labels = data.map(country => country.commonName);
    const areas = data.map(country => country.area);

    // Configuración de la gráfica
    const config: ChartConfiguration = {
      type: 'bar' as ChartType,
      data: {
        labels: labels,
        datasets: [{
          label: 'Área (km²)',
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
        plugins: {
          title: {
            display: true,
            text: 'Área de Países (km²)',
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
                const value = context.parsed.y;
                return `Área: ${value?.toString()} km²`;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'País',
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
              text: 'Área (km²)',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            beginAtZero: true,
            ticks: {
              callback: (value) => {
                return value.toLocaleString();
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

  
  
  
  getTotalArea(): number {
    return this.countriesData().reduce((sum, country) => sum + country.area, 0);
  }


  getAverageArea(): number {
    const data = this.countriesData();
    if (data.length === 0) return 0;
    return this.getTotalArea() / data.length;
  }

}
