import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LateralPanel } from './components/lateral-panel/lateral-panel';
import { Dashboard } from './components/dashboard/dashboard';
import { Router } from '@angular/router';
import { Login } from "./pages/login/login";
import { HttpClient } from '@angular/common/http';
import { Footer } from './components/footer/footer';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LateralPanel, Dashboard, Login, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('GBVV0U6T5L');
  protected readonly activeTab = signal('home');
  router = inject(Router);
  http = inject(HttpClient);

  logging = false;
  
  ngOnInit(): void {
    this.pingServer();
    this.checkToken();
    
    // Listen for storage changes (when token is added/removed in other tabs)
    window.addEventListener('storage', () => {
      this.checkToken();
    });

    console.log('App initialized: logging =', this.logging);
  }

  private pingServer(): void {

    this.http.get('/api/account/configuration').subscribe({
      next: (response : any) => {
        if(response.isSuccess){
          localStorage.setItem('appName', response.value.appName);
          localStorage.setItem('version', response.value.version);
          localStorage.setItem('environment', response.value.environment);
          
        }else{
          alert('Config Data no available');
        }
      },
      error: (error) => {
        //alert('Unable to reach app configuration data');
        console.error('Unable to reach app configuration data: ', error);
      }
    });


  }
  
  private checkToken(): void {
    const token = localStorage.getItem('tokenJWT');
    this.logging = !!token; 
  }
  
  logout(): void {
    localStorage.removeItem('tokenJWT');
    localStorage.removeItem('routes');
    localStorage.removeItem('sections');
    localStorage.removeItem('user');
    localStorage.removeItem('email');

    this.logging = false;
    this.activeTab.set('home');
  }
  
  onTabChange(tabId: string): void {
    this.activeTab.set(tabId);
  }
}
