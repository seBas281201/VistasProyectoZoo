import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CitaMedicaService } from './cita-medica.service';
import { CitaMedicaDto } from '../../shared/models/models';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog.component';
import { LoadingComponent } from '../../shared/components/loading.component';

@Component({
  selector: 'app-citas-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatIconModule,
            MatChipsModule, MatTooltipModule, LoadingComponent],
  template: `
    <div class="page">
      <div class="page-header">
        <div class="header-left">
          <span class="header-tag">VETERINARIA</span>
          <h1 class="header-title">Citas Médicas</h1>
          <p class="header-sub">{{ citas().length }} citas registradas</p>
        </div>
        <a routerLink="nuevo" class="btn-primary">
          <mat-icon>add</mat-icon> Nueva Cita
        </a>
      </div>

      <div class="table-card" style="position:relative">
        <app-loading [loading]="loading()"></app-loading>
        <table mat-table [dataSource]="citas()" class="zoo-table">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>#</th>
            <td mat-cell *matCellDef="let c"><span class="id-badge">{{ c.id }}</span></td>
          </ng-container>
          <ng-container matColumnDef="fecha">
            <th mat-header-cell *matHeaderCellDef>Fecha</th>
            <td mat-cell *matCellDef="let c"><span class="date-cell">{{ c.fecha }}</span></td>
          </ng-container>
          <ng-container matColumnDef="estadoCita">
            <th mat-header-cell *matHeaderCellDef>Estado</th>
            <td mat-cell *matCellDef="let c">
              <mat-chip [class]="'chip-estado-' + c.estadoCita.toLowerCase()">{{ c.estadoCita }}</mat-chip>
            </td>
          </ng-container>
          <ng-container matColumnDef="animalId">
            <th mat-header-cell *matHeaderCellDef>Animal</th>
            <td mat-cell *matCellDef="let c"><span class="ref-cell">· {{ c.animalId }}</span></td>
          </ng-container>
          <ng-container matColumnDef="usuarioId">
            <th mat-header-cell *matHeaderCellDef>Veterinario</th>
            <td mat-cell *matCellDef="let c"><span class="ref-cell">· {{ c.usuarioId }}</span></td>
          </ng-container>
          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef>Acciones</th>
            <td mat-cell *matCellDef="let c">
              <div class="action-btns">
                <button class="action-btn edit" [routerLink]="['editar', c.id]" matTooltip="Editar"><mat-icon>edit</mat-icon></button>
                <button class="action-btn del" (click)="confirmarEliminar(c)" matTooltip="Eliminar"><mat-icon>delete_outline</mat-icon></button>
              </div>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="columnas"></tr>
          <tr mat-row *matRowDef="let row; columns: columnas;" class="zoo-row"></tr>
          <tr *matNoDataRow><td class="no-data" [attr.colspan]="columnas.length">No hay citas registradas</td></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page { padding: 2.5rem; max-width: 1100px; margin: 0 auto; font-family: 'Inter', sans-serif; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
    .header-tag { font-size: 0.65rem; letter-spacing: 3px; color: #6ee76e; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 8px; }
    .header-title { font-size: 2.4rem; font-weight: 700; color: #fff; line-height: 1; margin-bottom: 6px; }
    .header-sub { font-size: 0.85rem; color: rgba(255,255,255,0.4); }
    .btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #6ee76e; color: #0b0f0c; padding: 12px 24px; border-radius: 50px; font-weight: 700; font-size: 0.88rem; text-decoration: none; box-shadow: 0 4px 20px rgba(110,231,110,0.3); transition: all 0.25s; }
    .btn-primary:hover { background: #88f088; transform: translateY(-1px); }
    .btn-primary mat-icon { font-size: 1.1rem; width: 18px; height: 18px; line-height: 18px; }
    .table-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; overflow: hidden; }
    .zoo-table { width: 100%; background: transparent !important; }
    .zoo-row:hover { background: rgba(110,231,110,0.03) !important; }
    .id-badge { font-size: 0.75rem; color: rgba(255,255,255,0.3); font-weight: 600; }
    .date-cell { color: #fff; font-weight: 500; font-size: 0.9rem; letter-spacing: 0.5px; }
    .ref-cell { color: rgba(255,255,255,0.5); font-size: 0.88rem; }
    .action-btns { display: flex; gap: 6px; }
    .action-btn { width: 34px; height: 34px; border-radius: 10px; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; background: transparent; }
    .action-btn mat-icon { font-size: 1.05rem; width: 18px; height: 18px; line-height: 18px; }
    .action-btn.edit { color: rgba(110,231,110,0.7); }
    .action-btn.edit:hover { background: rgba(110,231,110,0.12); color: #6ee76e; }
    .action-btn.del { color: rgba(255,80,80,0.6); }
    .action-btn.del:hover { background: rgba(255,80,80,0.12); color: #ff5050; }
    .no-data { text-align: center; padding: 3rem; color: rgba(255,255,255,0.25); font-size: 0.9rem; }
  `]
})
export class CitasListComponent implements OnInit {
  private service = inject(CitaMedicaService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  citas = signal<CitaMedicaDto[]>([]);
  loading = signal(false);
  columnas = ['id', 'fecha', 'estadoCita', 'animalId', 'usuarioId', 'acciones'];

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading.set(true);
    this.service.listar().subscribe({
      next: d => { this.citas.set(d); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  confirmarEliminar(cita: CitaMedicaDto) {
    this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Eliminar Cita', message: `¿Eliminar la cita del ${cita.fecha}?` }
    }).afterClosed().subscribe(ok => {
      if (ok) this.service.eliminar(cita.id!).subscribe({
        next: () => { this.snackBar.open('Cita eliminada', 'OK', { duration: 3000, panelClass: 'snack-ok' }); this.cargar(); }
      });
    });
  }
}
