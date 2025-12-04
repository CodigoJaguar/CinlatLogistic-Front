import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ClientProfile , ApiResponse } from '../../interfaces/clientprofile';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8889/';  

  constructor(private http: HttpClient) {}

  /**
   * GET - Obtener un usuario por ID
   */
  getUserById(id: number): Observable<ClientProfile> {
    return this.http.get<ClientProfile>(`${this.apiUrl}/users/${id}`);
    //              ↑
    //              Especifica que retorna un User
  }

  /**
   * GET - Obtener todos los usuarios
   */
  getAllUsers(): Observable<ClientProfile[]> {
    return this.http.get<ClientProfile[]>(`${this.apiUrl}api/load/getclientes`);
    //              ↑
    //              Especifica que retorna un array de User
  }

  /**
   * GET - Con respuesta envuelta en ApiResponse
   */
  getUserWithResponse(id: number): Observable<ClientProfile> {
    return this.http.get<ApiResponse<ClientProfile>>(`${this.apiUrl}/users/${id}`)
      .pipe(
        map(response => response.data)  // Extraer solo el data
      );
  }

  /**
   * GET - Con query parameters
   */
  getUsersByAge(minAge: number, maxAge: number): Observable<ClientProfile[]> {
    // Crear query parameters: ?minAge=20&maxAge=30
    const params = new HttpParams()
      .set('minAge', minAge.toString())
      .set('maxAge', maxAge.toString());

    return this.http.get<ClientProfile[]>(`${this.apiUrl}/users`, { params });
  }

  /**
   * GET - Con headers personalizados
   */
  getUsersWithHeaders(): Observable<ClientProfile[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Custom-Header': 'CustomValue'
    });

    return this.http.get<ClientProfile[]>(`${this.apiUrl}/users`, { headers });
  }

  /**
   * GET - Con transformación de datos
   */
  getActiveUsers(): Observable<ClientProfile[]> {
    return this.http.get<ClientProfile[]>(`${this.apiUrl}/users`)
      .pipe(
        map((users: ClientProfile[]) => {
          // Transformar o filtrar datos
          return users.filter(user => user.id >= 18);
        })
      );
  }

  /**
   * GET - Con manejo de errores
   */
  getUsersWithErrorHandling(): Observable<ClientProfile[]> {
    return this.http.get<ClientProfile[]>(`${this.apiUrl}/users`)
      .pipe(
        map((users: ClientProfile[]) => users),
        catchError((error) => {
          console.error('Error obteniendo usuarios:', error);
          throw error;  // Re-lanzar el error
        })
      );
  }
  
}
