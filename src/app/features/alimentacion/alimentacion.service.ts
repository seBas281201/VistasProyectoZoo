import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlimentacionDto, TipoComida } from '../../shared/models/models';

@Injectable({ providedIn: 'root' })
export class AlimentacionService {
  private http = inject(HttpClient);
  private base = '/alimentaciones';

  listar(): Observable<AlimentacionDto[]> {
    return this.http.get<AlimentacionDto[]>(this.base);
  }

  buscarPorId(id: number): Observable<AlimentacionDto> {
    return this.http.get<AlimentacionDto>(`${this.base}/${id}`);
  }

  listarPorAnimal(animalId: number): Observable<AlimentacionDto[]> {
    return this.http.get<AlimentacionDto[]>(`${this.base}/animal/${animalId}`);
  }

  listarPorTipo(tipo: TipoComida): Observable<AlimentacionDto[]> {
    return this.http.get<AlimentacionDto[]>(`${this.base}/tipo/${tipo}`);
  }

  crear(dto: AlimentacionDto): Observable<AlimentacionDto> {
    return this.http.post<AlimentacionDto>(this.base, dto);
  }

  actualizar(id: number, dto: AlimentacionDto): Observable<AlimentacionDto> {
    return this.http.put<AlimentacionDto>(`${this.base}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
