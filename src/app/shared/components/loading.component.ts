import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loading()) {
      <div class="loading-overlay">
        <div class="spinner"></div>
      </div>
    }
  `,
  styles: [`
    .loading-overlay {
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
      background: rgba(11,15,12,0.7);
      z-index: 10; border-radius: inherit;
    }
    .spinner {
      width: 36px; height: 36px;
      border: 3px solid rgba(110,231,110,0.2);
      border-top-color: #6ee76e;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class LoadingComponent {
  loading = input<boolean>(false);
}
