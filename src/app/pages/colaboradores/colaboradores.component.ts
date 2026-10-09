import { Component, OnInit,inject,TemplateRef, ViewChild } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ColaboradorService } from '../../services/colaborador.service';
import { Colaborador } from '../../models/colaborador';

/**
 * @class ColaboradoresComponent
 * @description Componente para la  visualización de la lista de colaboradores,
 * tambien para la evaluacion del nivel de riesgo del colaborador.
 * 
 * @implements {OnInit}
 */

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './colaboradores.component.html',
  styleUrl: './colaboradores.component.css'
})
export class ColaboradoresComponent  implements OnInit {

    /**
     * Servicio utilizado para obtener el listado de colaboradores
     */
  private colaboradorService = inject(ColaboradorService);

    /**
     * servicio para habilitar el modal de riesgo
     */
  private modalService = inject(NgbModal); 
  @ViewChild('nivelRiesgoModal') nivelRiesgoModal!: TemplateRef<any>;
  
  /**
   * arreglo de colaboradores donde se almacena el listado de objetos colaboradores obtenidos desde el servicio.
   */
  colaboradores: Colaborador[] = [];

  /** variable para almacenar el mensaje de nivel de riesgo del colaborador*/
  MensajeNivelRiesgo: string = '';

  ngOnInit(): void {
  }

  /**
   * Evalua y calcula el nivel de riesgo segun la edad enviada por parametro.
   * @param {number} edad - Edad del colaborador 
   * @returns {string} texto con el nivel de riesgo calculado.
   */
  calcularNivelRiesgo(edad: number): string{
    if (edad >= 18 && edad <= 25){
      return 'FUERA DE PELIGRO';
    }else if(edad >=26 && edad<= 50 ){
      return 'TENGA CUIDADO, TOME TODAS LAS MEDIDAS DE PREVENCION';
    }else if(edad >= 51){
      return 'PORFAVOR QUEDARSE EN CASA';
    }
    return 'EDAD NO VALIDA';
  }

  /**
   * Muestra el modal con el nivel de riesgo calculado para el colaborador seleccionado
   * @param {number} edad 
   */
  mostrarNivelRiesgo(edad:number):void{ 
    this.MensajeNivelRiesgo = this.calcularNivelRiesgo(edad);
    this.modalService.open(this.nivelRiesgoModal, { centered: true });
  }

  /**
   * Reliza la llamada al servicio de colaboradores para obtener el lisado de colaboradores, y lo 
   * almacena en el arreglo colaboradores
   */
  cargarColaboradores():void {
    this.colaboradorService.getColaboradores().subscribe((data: Colaborador[]) => {
      this.colaboradores = data; 
    });
  }
}
