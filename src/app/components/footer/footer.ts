import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer implements OnInit {
  version: string | null = null;
  appName: string | null = null;
  environment: string | null = null;

  ngOnInit(): void {
    this.loadFooterData();
    
    // Listen for storage changes to update footer when config is loaded
    window.addEventListener('storage', () => {
      this.loadFooterData();
    });
  }

  private loadFooterData(): void {
    this.version = localStorage.getItem('version');
    this.appName = localStorage.getItem('appName');
    this.environment = localStorage.getItem('environment');
  }
}
