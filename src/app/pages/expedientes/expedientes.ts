import { Component } from '@angular/core';
import { ClientList } from '../../components/client-list/client-list';
import type { Client } from '../../interfaces/client';
import { ClientProfile } from '../../interfaces/clientprofile';
import { ClienteService } from '../../services/cliente/cliente.service';

@Component({
  selector: 'app-expedientes',
  imports: [ClientList],
  templateUrl: './expedientes.html',
  styleUrl: './expedientes.scss'
})
export class Expedientes {

  clientesArray: ClientProfile[] = [];
  selectedUser: ClientProfile | null = null;
  isLoading = false;
  errorMessage = '';


  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  // clientes: Client[] = [
  //   { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
  //   { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' }
  // ]

  clientes : ClientProfile[] = [
    {
      id: 0,
      persona: {
        nombre: 'Juan',
        apellidoMaterno: 'Pérez',
        apellidoPaterno: 'Gómez',
        curp: 'PEPJ010101HDFRNS00'
      },
      giro: 'Comercio',
      riesgo: 'Bajo',
      actividadEconomica: 'Venta al por menor',
      ingreso: '10000',
      sucursal: 'Sucursal 1'
    }
  ];

  loadClientes(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.clienteService.getAllUsers().subscribe({
      next: (clients: any) => {
        //     ↑ TypeScript sabe que users es User[]
        //this.clientesArray = clients;
        console.log('Clientes cargados:', clients.value.items);
        

        clients.value.items.forEach( (x: ClientProfile) => {
          console.log(`${x.id} - ${x.giro} - ${x.persona.nombre} - ${x.riesgo}`);
           var client_profile : ClientProfile = {
            id: x.id,
            persona: {
              // limita el numero de caracteres en nombre a 30
              nombre: x.persona.nombre.length > 30 ? x.persona.nombre.substring(0, 30) + '...' : x.persona.nombre,
              apellidoMaterno: x.persona.apellidoMaterno.length > 30 ? x.persona.apellidoMaterno.substring(0, 30) + '...' : x.persona.apellidoMaterno,
              apellidoPaterno: x.persona.apellidoPaterno.length > 30 ? x.persona.apellidoPaterno.substring(0, 30) + '...' : x.persona.apellidoPaterno,
              curp: x.persona.curp
            },
            giro: x.giro,
            riesgo: x.riesgo,
            actividadEconomica: x.actividadEconomica,
            ingreso: x.ingreso,
            sucursal: x.sucursal
          };

          this.clientes.push(client_profile);
        });
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando clientes:', error);
        this.errorMessage = 'Error al cargar clientes';
        this.isLoading = false;
      },
      complete: () => {
        console.log('Carga de clientes completada');
      }
    });
  }

}
