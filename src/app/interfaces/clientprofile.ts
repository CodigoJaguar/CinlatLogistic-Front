
export interface ClientProfile {
  id: number;
  persona: { nombre: string; apellidoPaterno: string; apellidoMaterno: string; curp: string; };
  riesgo: string;
  actividadEconomica: string;
  ingreso: string;
  sucursal: string;
  giro: string;
}


export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}