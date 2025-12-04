import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lateral-panel',
  imports: [CommonModule, RouterLink],
  templateUrl: './lateral-panel.html',
  styleUrl: './lateral-panel.scss'
})
export class LateralPanel {
  protected readonly activeTab = signal('home');
  tabChange = output<string>();
  
  protected readonly tabs = [
    { id: '/home', label: 'Home', icon: '🏠', active: false },
    { id: '/autorizaciones', label: 'Autorizaciones', icon: '🔔', active: false },
    { id: '/expedientes', label: 'Expedientes', icon: '🔔', active: false },
    { id: '/alertas', label: 'Alertas', icon: '🔔', active: false },
    { id: '/avisos', label: 'Avisos', icon: '🔔', active: false },
    { id: '/bitacoras', label: 'Bitácoras', icon: '🔔', active: false },
    { id: '/reportes', label: 'Reportes', icon: '🔔', active: false },
    { id: '/condusef', label: 'CONDUSEF', icon: '🔔', active: false },
    { id: '/notificaciones', label: 'Notificaciones', icon: '🔔', active: false },
    { id: '/listas', label: 'Listas', icon: '🔔', active: false },
    { id: '/ayuda', label: 'Ayuda', icon: '❓', active: false }
  ];

  protected get filteredTabs() {
    const routesFromStorage = this.getRoutesFromLocalStorage();
    return this.tabs.filter(tab => routesFromStorage.includes(tab.id));
  }

  private getRoutesFromLocalStorage(): string[] {
    try {
      const routes = localStorage.getItem('routes');
      return routes ? JSON.parse(routes) : [];
    } catch (error) {
      console.error('Error parsing routes from localStorage:', error);
      return [];
    }
  }

  protected setActiveTab(tabId: string): void {
    this.activeTab.set(tabId);
    this.tabChange.emit(tabId);
  }
}
