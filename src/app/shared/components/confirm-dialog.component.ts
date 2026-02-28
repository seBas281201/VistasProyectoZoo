import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface ConfirmDialogData { title: string; message: string; }

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="dialog-wrap">
      <h2 class="dialog-title">{{ data.title }}</h2>
      <p class="dialog-msg">{{ data.message }}</p>
      <div class="dialog-actions">
        <button class="btn-cancel" [mat-dialog-close]="false">Cancelar</button>
        <button class="btn-confirm" [mat-dialog-close]="true">Eliminar</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-wrap { padding: 32px; min-width: 340px; }
    .dialog-title { font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 12px; }
    .dialog-msg { color: rgba(255,255,255,0.6); font-size: 0.9rem; line-height: 1.6; margin-bottom: 32px; }
    .dialog-actions { display: flex; gap: 12px; justify-content: flex-end; }
    .btn-cancel {
      background: transparent; border: 1px solid rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.6); padding: 10px 22px; border-radius: 50px;
      cursor: pointer; font-size: 0.88rem; transition: all 0.2s;
    }
    .btn-cancel:hover { border-color: rgba(255,255,255,0.3); color: #fff; }
    .btn-confirm {
      background: rgba(255,80,80,0.15); border: 1px solid rgba(255,80,80,0.4);
      color: #ff5050; padding: 10px 22px; border-radius: 50px;
      cursor: pointer; font-size: 0.88rem; font-weight: 600; transition: all 0.2s;
    }
    .btn-confirm:hover { background: rgba(255,80,80,0.25); }
  `]
})
export class ConfirmDialogComponent {
  data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
}
