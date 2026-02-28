import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitaMedicaDto, EstadoCita } from '../../shared/models/models';

@Injectable({ providedIn: 'root' })
export class CitaMedicaService {
  private http = inject(HttpClient);
  private base = '/citas';

  listar(): Observable<CitaMedicaDto[]> {
    return this.http.get<CitaMedicaDto[]>(this.base);
  }

  buscarPorId(id: number): Observable<CitaMedicaDto> {
    return this.http.get<CitaMedicaDto>(`${this.base}/${id}`);
  }

  listarPorAnimal(animalId: number): Observable<CitaMedicaDto[]> {
    return this.http.get<CitaMedicaDto[]>(`${this.base}/animal/${animalId}`);
  }

  listarPorUsuario(usuarioId: number): Observable<CitaMedicaDto[]> {
    return this.http.get<CitaMedicaDto[]>(`${this.base}/usuario/${usuarioId}`);
  }

  listarPorEstado(estado: EstadoCita): Observable<CitaMedicaDto[]> {
    return this.http.get<CitaMedicaDto[]>(`${this.base}/estado/${estado}`);
  }

  listarPorFecha(fecha: string): Observable<CitaMedicaDto[]> {
    return this.http.get<CitaMedicaDto[]>(`${this.base}/fecha/${fecha}`);
  }

  crear(dto: CitaMedicaDto): Observable<CitaMedicaDto> {
    return this.http.post<CitaMedicaDto>(this.base, dto);
  }

  actualizar(id: number, dto: CitaMedicaDto): Observable<CitaMedicaDto> {
    return this.http.put<CitaMedicaDto>(`${this.base}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
