/**
 * @interface Colaborador
 * @description Representa la estructura de datos para la entidad de un colaborador proveniente de el backend.
 */
export interface Colaborador {
  idcolaborador: number;
  nombre: string;
  apellido: string;
  direccion: string;
  edad: number;
  profesion: string;
  estado_civil: string;
}