import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlimentacionService } from './alimentacion.service';
import { AnimalService } from '../animales/animal.service';
import { TIPO_COMIDA_VALUES, AnimalDto } from '../../shared/models/models';
import { LoadingComponent } from '../../shared/components/loading.component';

@Component({
  selector: 'app-alimentacion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,
            MatFormFieldModule, MatInputModule, MatSelectModule,
            MatIconModule, LoadingComponent],
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <span class="header-tag">{{ editId ? 'EDITAR' : 'NUEVO' }}</span>
          <h1 class="header-title">{{ editId ? 'Editar Alimentación' : 'Nueva Alimentación' }}</h1>
        </div>
        <a routerLink="/alimentacion" class="btn-back"><mat-icon>arrow_back</mat-icon> Volver</a>
      </div>

      <div class="form-card" style="position:relative">
        <app-loading [loading]="loading()"></app-loading>
        <form [formGroup]="form" (ngSubmit)="guardar()">
          <div class="form-grid">
            <div class="field-wrap full-width">
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
              <label class="field-label">Tipo de Comida *</label>
              <mat-form-field appearance="outline" class="dark-field">
                <mat-select formControlName="tipoComida">
                  @for (t of tiposComida; track t) {
                    <mat-option [value]="t">{{ t }}</mat-option>
                  }
                </mat-select>
                @if (form.get('tipoComida')?.hasError('required') && form.get('tipoComida')?.touched) {
                  <mat-error>Obligatorio</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="field-wrap">
              <label class="field-label">Cantidad (1–100 kg) *</label>
              <mat-form-field appearance="outline" class="dark-field">
                <input matInput type="number" formControlName="cantidad" min="1" max="100">
                @if (form.get('cantidad')?.hasError('required') && form.get('cantidad')?.touched) {
                  <mat-error>Obligatorio</mat-error>
                }
                @if (form.get('cantidad')?.hasError('min') || form.get('cantidad')?.hasError('max')) {
                  <mat-error>Entre 1 y 100 kg</mat-error>
                }
              </mat-form-field>
            </div>
          </div>

          <div class="form-actions">
            <a routerLink="/alimentacion" class="btn-cancel">Cancelar</a>
            <button type="submit" class="btn-primary" [disabled]="loading()">
              <mat-icon>save</mat-icon> {{ editId ? 'Actualizar' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .page { padding: 2.5rem; max-width: 700px; margin: 0 auto; font-family: 'Inter', sans-serif; }
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
export class AlimentacionFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(AlimentacionService);
  private animalService = inject(AnimalService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  tiposComida = TIPO_COMIDA_VALUES;
  animales = signal<AnimalDto[]>([]);
  loading = signal(false);
  editId: number | null = null;

  form = this.fb.group({
    animalId: [null as number | null, Validators.required],
    tipoComida: [null as string | null, Validators.required],
    cantidad: [null as number | null, [Validators.required, Validators.min(1), Validators.max(100)]]
  });

  ngOnInit() {
    this.animalService.listar().subscribe(a => this.animales.set(a));
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
        this.snackBar.open(this.editId ? 'Actualizado' : 'Creado', 'OK', { duration: 3000, panelClass: 'snack-ok' });
        this.router.navigate(['/alimentacion']);
      },
      error: () => this.loading.set(false)
    });
  }
}
