import { Component, signal, input } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { providePrimeNG } from 'primeng/config';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import type { Client } from '../../interfaces/client';
import { ClientProfile } from '../../interfaces/clientprofile';

@Component({
  selector: 'app-client-list',
  imports: [ ButtonModule, CardModule, TableModule, TooltipModule ],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss',
  standalone: true
})
export class ClientList {
  clients = input<ClientProfile[]>([])
  loading = signal<boolean>(true)



  viewClient(client: ClientProfile) {
    console.log('View client:', client);
  }

  // editClient(client: Client) {
  //   console.log('Edit client:', client);
  // }

  // deleteClient(client: Client) {
  //   console.log('Delete client:', client);
  // }
}
