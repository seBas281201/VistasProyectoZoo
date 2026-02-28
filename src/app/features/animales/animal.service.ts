import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimalDto, EstadoSalud, TipoAnimal } from '../../shared/models/models';

@Injectable({ providedIn: 'root' })
export class AnimalService {
  private http = inject(HttpClient);
  private base = '/animales';

  listar(): Observable<AnimalDto[]> {
    return this.http.get<AnimalDto[]>(this.base);
  }

  buscarPorId(id: number): Observable<AnimalDto> {
    return this.http.get<AnimalDto>(`${this.base}/${id}`);
  }

  crear(dto: AnimalDto): Observable<AnimalDto> {
    return this.http.post<AnimalDto>(this.base, dto);
  }

  actualizar(id: number, dto: AnimalDto): Observable<AnimalDto> {
    return this.http.put<AnimalDto>(`${this.base}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  listarPorEspecie(especie: string): Observable<AnimalDto[]> {
    return this.http.get<AnimalDto[]>(`${this.base}/especie/${especie}`);
  }

  listarPorEstado(estado: EstadoSalud): Observable<AnimalDto[]> {
    return this.http.get<AnimalDto[]>(`${this.base}/estado/${estado}`);
  }

  listarPorTipo(tipo: TipoAnimal): Observable<AnimalDto[]> {
    return this.http.get<AnimalDto[]>(`${this.base}/tipo/${tipo}`);
  }
}
