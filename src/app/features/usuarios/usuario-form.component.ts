import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from './usuario.service';
import { LoadingComponent } from '../../shared/components/loading.component';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,
            MatFormFieldModule, MatInputModule, MatCheckboxModule,
            MatIconModule, LoadingComponent],
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <span class="header-tag">{{ editId ? 'EDITAR' : 'NUEVO' }}</span>
          <h1 class="header-title">{{ editId ? 'Editar Usuario' : 'Nuevo Usuario' }}</h1>
        </div>
        <a routerLink="/usuarios" class="btn-back"><mat-icon>arrow_back</mat-icon> Volver</a>
      </div>

      <div class="form-card" style="position:relative">
        <app-loading [loading]="loading()"></app-loading>
        <form [formGroup]="form" (ngSubmit)="guardar()">
          <div class="form-grid">

            <div class="field-wrap">
              <label class="field-label">Nombre *</label>
              <mat-form-field appearance="outline" class="dark-field">
                <input matInput formControlName="nombre" placeholder="Nombre completo">
                @if (form.get('nombre')?.hasError('required') && form.get('nombre')?.touched) {
                  <mat-error>El nombre es obligatorio</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="field-wrap">
              <label class="field-label">Email *</label>
              <mat-form-field appearance="outline" class="dark-field">
                <input matInput type="email" formControlName="email" placeholder="correo@ejemplo.com">
                @if (form.get('email')?.hasError('required') && form.get('email')?.touched) {
                  <mat-error>El email es obligatorio</mat-error>
                }
                @if (form.get('email')?.hasError('email') && form.get('email')?.touched) {
                  <mat-error>Formato inválido</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="field-wrap full-width">
              <label class="field-label">Contraseña (8–20 caracteres) *</label>
              <mat-form-field appearance="outline" class="dark-field">
                <input matInput [type]="showPass ? 'text' : 'password'" formControlName="password">
                <button mat-icon-button matSuffix type="button" (click)="showPass = !showPass" style="color:rgba(255,255,255,0.4)">
                  <mat-icon>{{ showPass ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
                @if (form.get('password')?.hasError('required') && form.get('password')?.touched) {
                  <mat-error>La contraseña es obligatoria</mat-error>
                }
                @if (form.get('password')?.hasError('minlength') || form.get('password')?.hasError('maxlength')) {
                  <mat-error>Debe tener entre 8 y 20 caracteres</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="field-wrap full-width">
              <mat-checkbox formControlName="activo" class="dark-check">
                <span class="check-label">Usuario activo</span>
              </mat-checkbox>
            </div>

          </div>

          <div class="form-actions">
            <a routerLink="/usuarios" class="btn-cancel">Cancelar</a>
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
    .check-label { color: rgba(255,255,255,0.7); font-size: 0.9rem; }
    .form-actions { display: flex; gap: 12px; justify-content: flex-end; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.06); margin-top: 1rem; }
    .btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #6ee76e; color: #0b0f0c; padding: 12px 26px; border-radius: 50px; font-weight: 700; font-size: 0.88rem; border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(110,231,110,0.3); transition: all 0.25s; }
    .btn-primary:hover:not([disabled]) { background: #88f088; transform: translateY(-1px); }
    .btn-primary[disabled] { opacity: 0.5; cursor: not-allowed; }
    .btn-primary mat-icon { font-size: 1.1rem; width: 18px; height: 18px; line-height: 18px; }
    .btn-cancel { display: inline-flex; align-items: center; color: rgba(255,255,255,0.45); text-decoration: none; font-size: 0.88rem; padding: 12px 22px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.1); transition: all 0.2s; }
    .btn-cancel:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
  `]
})
export class UsuarioFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(UsuarioService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loading = signal(false);
  editId: number | null = null;
  showPass = false;

  form = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    activo: [true, Validators.required]
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
        this.snackBar.open(this.editId ? 'Usuario actualizado' : 'Usuario creado', 'OK', { duration: 3000, panelClass: 'snack-ok' });
        this.router.navigate(['/usuarios']);
      },
      error: () => this.loading.set(false)
    });
  }
}
