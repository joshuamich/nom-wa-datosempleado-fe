import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Colaborador } from "../models/colaborador";

/**
 * @class ColaboradorService 
 * @description Servicio para obtener de la api la informacion exclusivamente de los colaboradores
 */

@Injectable({
  providedIn: "root",
})

export class ColaboradorService {
  /**
   * esta es la ruta que contiene todas operaciones relacionados a los colaboradores.
   */
  private apiUrl = "http://localhost:3000/api/colaboradores";

  /**
   * cliente http para realizar las peticiones
   */
  constructor(private http: HttpClient) {} 

  /**
   * funcion encargada de realizar las peticiones get y obtener el listado completo de colaboradores
   * @returns {Observable<Colaborador[]>} 
   */
  getColaboradores(): Observable<Colaborador[]> { 
      return this.http.get<Colaborador[]>(this.apiUrl);
  }
}

