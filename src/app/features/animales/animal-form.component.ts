import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnimalService } from './animal.service';
import { TIPO_ANIMAL_VALUES, ESTADO_SALUD_VALUES } from '../../shared/models/models';
import { LoadingComponent } from '../../shared/components/loading.component';

@Component({
  selector: 'app-animal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,
            MatFormFieldModule, MatInputModule, MatSelectModule,
            MatIconModule, LoadingComponent],
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <span class="header-tag">{{ editId ? 'EDITAR' : 'NUEVO' }}</span>
          <h1 class="header-title">{{ editId ? 'Editar Animal' : 'Nuevo Animal' }}</h1>
        </div>
        <a routerLink="/animales" class="btn-back">
          <mat-icon>arrow_back</mat-icon> Volver
        </a>
      </div>

      <div class="form-card" style="position:relative">
        <app-loading [loading]="loading()"></app-loading>

        <form [formGroup]="form" (ngSubmit)="guardar()">
          <div class="form-grid">

            <div class="field-wrap">
              <label class="field-label">Nombre *</label>
              <mat-form-field appearance="outline" class="dark-field">
                <input matInput formControlName="nombre" placeholder="Ej: Leo">
                @if (form.get('nombre')?.hasError('required') && form.get('nombre')?.touched) {
                  <mat-error>El nombre es obligatorio</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="field-wrap">
              <label class="field-label">Especie *</label>
              <mat-form-field appearance="outline" class="dark-field">
                <input matInput formControlName="especie" placeholder="Ej: Panthera leo">
                @if (form.get('especie')?.hasError('required') && form.get('especie')?.touched) {
                  <mat-error>La especie es obligatoria</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="field-wrap">
              <label class="field-label">Edad (0–100 años) *</label>
              <mat-form-field appearance="outline" class="dark-field">
                <input matInput type="number" formControlName="edad" min="0" max="100">
                @if (form.get('edad')?.hasError('required') && form.get('edad')?.touched) {
                  <mat-error>La edad es obligatoria</mat-error>
                }
                @if (form.get('edad')?.hasError('min') || form.get('edad')?.hasError('max')) {
                  <mat-error>Edad entre 0 y 100</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="field-wrap">
              <label class="field-label">Tipo de Animal *</label>
              <mat-form-field appearance="outline" class="dark-field">
                <mat-select formControlName="tipoAnimal">
                  @for (t of tiposAnimal; track t) {
                    <mat-option [value]="t">{{ t }}</mat-option>
                  }
                </mat-select>
                @if (form.get('tipoAnimal')?.hasError('required') && form.get('tipoAnimal')?.touched) {
                  <mat-error>Obligatorio</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="field-wrap full-width">
              <label class="field-label">Estado de Salud *</label>
              <mat-form-field appearance="outline" class="dark-field">
                <mat-select formControlName="estadoSalud">
                  @for (e of estadosSalud; track e) {
                    <mat-option [value]="e">{{ e }}</mat-option>
                  }
                </mat-select>
                @if (form.get('estadoSalud')?.hasError('required') && form.get('estadoSalud')?.touched) {
                  <mat-error>Obligatorio</mat-error>
                }
              </mat-form-field>
            </div>

          </div>

          <div class="form-actions">
            <a routerLink="/animales" class="btn-cancel">Cancelar</a>
            <button type="submit" class="btn-primary" [disabled]="loading()">
              <mat-icon>save</mat-icon>
              {{ editId ? 'Actualizar' : 'Guardar' }}
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

    .btn-back {
      display: inline-flex; align-items: center; gap: 6px;
      color: rgba(255,255,255,0.5); text-decoration: none;
      font-size: 0.88rem; padding: 8px 16px; border-radius: 50px;
      border: 1px solid rgba(255,255,255,0.1); transition: all 0.2s;
    }
    .btn-back:hover { color: #fff; border-color: rgba(255,255,255,0.25); }
    .btn-back mat-icon { font-size: 1rem; width: 16px; height: 16px; line-height: 16px; }

    .form-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 20px; padding: 2rem 2.5rem;
      backdrop-filter: blur(20px);
    }

    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 1.5rem; }
    .field-wrap { margin-bottom: 0.5rem; }
    .full-width { grid-column: 1 / -1; }

    .field-label { display: block; font-size: 0.75rem; letter-spacing: 1px; color: rgba(255,255,255,0.45); text-transform: uppercase; font-weight: 600; margin-bottom: 6px; }
    .dark-field { width: 100%; }

    .form-actions { display: flex; gap: 12px; justify-content: flex-end; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.06); margin-top: 1rem; }

    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: #6ee76e; color: #0b0f0c; padding: 12px 26px;
      border-radius: 50px; font-weight: 700; font-size: 0.88rem;
      text-decoration: none; border: none; cursor: pointer;
      box-shadow: 0 4px 20px rgba(110,231,110,0.3); transition: all 0.25s;
    }
    .btn-primary:hover:not([disabled]) { background: #88f088; transform: translateY(-1px); }
    .btn-primary[disabled] { opacity: 0.5; cursor: not-allowed; }
    .btn-primary mat-icon { font-size: 1.1rem; width: 18px; height: 18px; line-height: 18px; }

    .btn-cancel {
      display: inline-flex; align-items: center;
      color: rgba(255,255,255,0.45); text-decoration: none;
      font-size: 0.88rem; padding: 12px 22px; border-radius: 50px;
      border: 1px solid rgba(255,255,255,0.1); transition: all 0.2s;
    }
    .btn-cancel:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
  `]
})
export class AnimalFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(AnimalService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  tiposAnimal = TIPO_ANIMAL_VALUES;
  estadosSalud = ESTADO_SALUD_VALUES;
  loading = signal(false);
  editId: number | null = null;

  form = this.fb.group({
    nombre: ['', [Validators.required]],
    especie: ['', [Validators.required]],
    edad: [null as number | null, [Validators.required, Validators.min(0), Validators.max(100)]],
    tipoAnimal: [null as string | null, Validators.required],
    estadoSalud: [null as string | null, Validators.required]
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = +id;
      this.loading.set(true);
      this.service.buscarPorId(this.editId).subscribe({
        next: d => { this.form.patchValue(d as any); this.loading.set(false); },
        error: () => this.loading.set(false)
      });
    }
  }

  guardar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    const dto = this.form.value as any;
    const op = this.editId ? this.service.actualizar(this.editId, dto) : this.service.crear(dto);
    op.subscribe({
      next: () => {
        this.snackBar.open(this.editId ? 'Animal actualizado' : 'Animal creado', 'OK', { duration: 3000, panelClass: 'snack-ok' });
        this.router.navigate(['/animales']);
      },
      error: () => this.loading.set(false)
    });
  }
}
