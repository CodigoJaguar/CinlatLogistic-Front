import { Component, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  isVisible = input<boolean>(false);
  logoutClick = output<void>();
  
  protected readonly activeDashboardTab = signal('ayuda');
  
  protected readonly dashboardTabs = [
    { id: 'ayuda', label: 'Ayuda', icon: '❓' },
    { id: 'configuraciones', label: 'Configuraciones', icon: '⚙️' },
    { id: 'servicios', label: 'Servicios adicionales', icon: '🔧' }
  ];
  
  protected readonly user = {
    name: localStorage.getItem('user'),
    email: localStorage.getItem('email'),
    avatar: '/assets/user-avatar.jpg'
  };

  protected setActiveDashboardTab(tabId: string): void {
    this.activeDashboardTab.set(tabId);
  }
  
  protected onLogout(): void {
    this.logoutClick.emit();
  }
}
