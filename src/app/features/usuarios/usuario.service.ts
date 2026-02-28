import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioDto } from '../../shared/models/models';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private base = '/usuarios';

  listar(): Observable<UsuarioDto[]> {
    return this.http.get<UsuarioDto[]>(this.base);
  }

  buscarPorId(id: number): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(`${this.base}/${id}`);
  }

  buscarPorEmail(email: string): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(`${this.base}/email/${email}`);
  }

  listarPorActivo(activo: boolean): Observable<UsuarioDto[]> {
    return this.http.get<UsuarioDto[]>(`${this.base}/activo/${activo}`);
  }

  crear(dto: UsuarioDto): Observable<UsuarioDto> {
    return this.http.post<UsuarioDto>(this.base, dto);
  }

  actualizar(id: number, dto: UsuarioDto): Observable<UsuarioDto> {
    return this.http.put<UsuarioDto>(`${this.base}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
