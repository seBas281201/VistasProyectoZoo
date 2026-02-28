// ---- Enums ----
export type TipoAnimal = 'FELINO' | 'REPTIL';
export type EstadoSalud = 'EXCELENTE' | 'MEDIA' | 'MALA';
export type TipoComida = 'CARNES' | 'PLANTAS';
export type EstadoCita = 'PENDIENTE' | 'CANCELADA' | 'ACTIVA';
export type Rol = 'ADMIN' | 'VETERINARIO' | 'CUIDADOR';

export const TIPO_ANIMAL_VALUES: TipoAnimal[] = ['FELINO', 'REPTIL'];
export const ESTADO_SALUD_VALUES: EstadoSalud[] = ['EXCELENTE', 'MEDIA', 'MALA'];
export const TIPO_COMIDA_VALUES: TipoComida[] = ['CARNES', 'PLANTAS'];
export const ESTADO_CITA_VALUES: EstadoCita[] = ['PENDIENTE', 'CANCELADA', 'ACTIVA'];

// ---- DTOs ----
export interface AnimalDto {
  id?: number;
  nombre: string;
  especie: string;
  edad: number;
  estadoSalud: EstadoSalud;
  tipoAnimal: TipoAnimal;
}

export interface AlimentacionDto {
  id?: number;
  tipoComida: TipoComida;
  cantidad: number;
  animalId: number;
}

export interface CitaMedicaDto {
  id?: number;
  fecha: string; // ISO date: yyyy-MM-dd
  estadoCita: EstadoCita;
  animalId: number;
  usuarioId: number;
}

export interface UsuarioDto {
  id?: number;
  nombre: string;
  email: string;
  password: string;
  activo: boolean;
}

// ---- Error response ----
export interface BackendError {
  error?: string;
  [field: string]: string | undefined;
}
