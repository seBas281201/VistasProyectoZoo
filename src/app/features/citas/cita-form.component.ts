import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitaMedicaService } from './cita-medica.service';
import { AnimalService } from '../animales/animal.service';
import { UsuarioService } from '../usuarios/usuario.service';
import { ESTADO_CITA_VALUES, AnimalDto, UsuarioDto } from '../../shared/models/models';
import { LoadingComponent } from '../../shared/components/loading.component';

@Component({
  selector: 'app-cita-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,
            MatFormFieldModule, MatInputModule, MatSelectModule,
            MatDatepickerModule, MatNativeDateModule, MatIconModule, LoadingComponent],
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <span class="header-tag">{{ editId ? 'EDITAR' : 'NUEVA' }}</span>
          <h1 class="header-title">{{ editId ? 'Editar Cita' : 'Nueva Cita Médica' }}</h1>
        </div>
        <a routerLink="/citas" class="btn-back"><mat-icon>arrow_back</mat-icon> Volver</a>
      </div>

      <div class="form-card" style="position:relative">
        <app-loading [loading]="loading()"></app-loading>
        <form [formGroup]="form" (ngSubmit)="guardar()">
          <div class="form-grid">

            <div class="field-wrap">
              <label class="field-label">Fecha (presente o futura) *</label>
              <mat-form-field appearance="outline" class="dark-field">
                <input matInput [matDatepicker]="picker" formControlName="fecha" [min]="today">
                <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                @if (form.get('fecha')?.hasError('required') && form.get('fecha')?.touched) {
                  <mat-error>La fecha es obligatoria</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="field-wrap">
              <label class="field-label">Estado de la Cita *</label>
              <mat-form-field appearance="outline" class="dark-field">
                <mat-select formControlName="estadoCita">
                  @for (e of estadosCita; track e) {
                    <mat-option [value]="e">{{ e }}</mat-option>
                  }
                </mat-select>
                @if (form.get('estadoCita')?.hasError('required') && form.get('estadoCita')?.touched) {
                  <mat-error>Obligatorio</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="field-wrap">
              <label class="field-label">Animal *</label>
              <mat-form-field appearance="outline" class="dark-field">
                <mat-select formControlName="animalId">
                  @for (a of animales(); track a.id) {
                    <mat-option [value]="a.id">{{ a.nombre }} — {{ a.especie }}</mat-option>
                  }
                </mat-select>
                @if (form.get('animalId')?.hasError('required') && form.get('animalId')?.touched) {
                  <mat-error>Obligatorio</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="field-wrap">
              <label class="field-label">Veterinario / Usuario *</label>
              <mat-form-field appearance="outline" class="dark-field">
                <mat-select formControlName="usuarioId">
                  @for (u of usuarios(); track u.id) {
                    <mat-option [value]="u.id">{{ u.nombre }}</mat-option>
                  }
                </mat-select>
                @if (form.get('usuarioId')?.hasError('required') && form.get('usuarioId')?.touched) {
                  <mat-error>Obligatorio</mat-error>
                }
              </mat-form-field>
            </div>

          </div>

          <div class="form-actions">
            <a routerLink="/citas" class="btn-cancel">Cancelar</a>
            <button type="submit" class="btn-primary" [disabled]="loading()">
              <mat-icon>save</mat-icon> {{ editId ? 'Actualizar' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .page { padding: 2.5rem; max-width: 740px; margin: 0 auto; font-family: 'Inter', sans-serif; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
    .header-tag { font-size: 0.65rem; letter-spacing: 3px; color: #6ee76e; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 8px; }
    .header-title { font-size: 2.2rem; font-weight: 700; color: #fff; line-height: 1; }
    .btn-back { display: inline-flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.88rem; padding: 8px 16px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.1); transition: all 0.2s; }
    .btn-back:hover { color: #fff; border-color: rgba(255,255,255,0.25); }
    .btn-back mat-icon { font-size: 1rem; width: 16px; height: 16px; line-height: 16px; }
    .form-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 2rem 2.5rem; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 1.5rem; }
    .field-wrap { margin-bottom: 0.5rem; }
    .full-width { grid-column: 1 / -1; }
    .field-label { display: block; font-size: 0.75rem; letter-spacing: 1px; color: rgba(255,255,255,0.45); text-transform: uppercase; font-weight: 600; margin-bottom: 6px; }
    .dark-field { width: 100%; }
    .form-actions { display: flex; gap: 12px; justify-content: flex-end; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.06); margin-top: 1rem; }
    .btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #6ee76e; color: #0b0f0c; padding: 12px 26px; border-radius: 50px; font-weight: 700; font-size: 0.88rem; border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(110,231,110,0.3); transition: all 0.25s; }
    .btn-primary:hover:not([disabled]) { background: #88f088; transform: translateY(-1px); }
    .btn-primary[disabled] { opacity: 0.5; cursor: not-allowed; }
    .btn-primary mat-icon { font-size: 1.1rem; width: 18px; height: 18px; line-height: 18px; }
    .btn-cancel { display: inline-flex; align-items: center; color: rgba(255,255,255,0.45); text-decoration: none; font-size: 0.88rem; padding: 12px 22px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.1); transition: all 0.2s; }
    .btn-cancel:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
  `]
})
export class CitaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(CitaMedicaService);
  private animalService = inject(AnimalService);
  private usuarioService = inject(UsuarioService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  estadosCita = ESTADO_CITA_VALUES;
  animales = signal<AnimalDto[]>([]);
  usuarios = signal<UsuarioDto[]>([]);
  loading = signal(false);
  editId: number | null = null;
  today = new Date();

  form = this.fb.group({
    fecha: [null as Date | null, Validators.required],
    estadoCita: [null as string | null, Validators.required],
    animalId: [null as number | null, Validators.required],
    usuarioId: [null as number | null, Validators.required]
  });

  ngOnInit() {
    this.animalService.listar().subscribe(a => this.animales.set(a));
    this.usuarioService.listar().subscribe(u => this.usuarios.set(u));
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = +id;
      this.loading.set(true);
      this.service.buscarPorId(this.editId).subscribe({
        next: d => { this.form.patchValue({ ...d as any, fecha: d.fecha ? new Date(d.fecha) : null }); this.loading.set(false); },
        error: () => this.loading.set(false)
      });
    }
  }

  guardar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    const raw = this.form.value;
    const fecha = raw.fecha ? this.fmt(raw.fecha as Date) : '';
    const dto = { ...raw, fecha } as any;
    const op = this.editId ? this.service.actualizar(this.editId, dto) : this.service.crear(dto);
    op.subscribe({
      next: () => {
        this.snackBar.open(this.editId ? 'Cita actualizada' : 'Cita creada', 'OK', { duration: 3000, panelClass: 'snack-ok' });
        this.router.navigate(['/citas']);
      },
      error: () => this.loading.set(false)
    });
  }

  private fmt(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
}
