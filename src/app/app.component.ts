import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, RouterLinkActive, CommonModule,
            MatSidenavModule, MatListModule, MatIconModule],
  template: `
    <mat-sidenav-container class="root-container">
      <mat-sidenav mode="side" opened class="sidenav">
        <div class="nav-logo">
          <img src="assets/imgs/logo.png" alt="Animalia" class="logo-img">
          <div class="logo-labels">
            <span class="logo-name">Animalia</span>
            <span class="logo-sub">Sistema de Gestión</span>
          </div>
        </div>
        <div class="nav-divider"></div>
        <nav class="nav-links">
          <a routerLink="/animales" routerLinkActive="nav-active" class="nav-item">
            <mat-icon class="nav-icon">pets</mat-icon>
            <span>Animales</span>
          </a>
          <a routerLink="/alimentacion" routerLinkActive="nav-active" class="nav-item">
            <mat-icon class="nav-icon">restaurant</mat-icon>
            <span>Alimentación</span>
          </a>
          <a routerLink="/citas" routerLinkActive="nav-active" class="nav-item">
            <mat-icon class="nav-icon">medical_services</mat-icon>
            <span>Citas Médicas</span>
          </a>
          <a routerLink="/usuarios" routerLinkActive="nav-active" class="nav-item">
            <mat-icon class="nav-icon">people</mat-icon>
            <span>Usuarios</span>
          </a>
        </nav>
        <div class="nav-footer">
          <div class="nav-badge">
            <span class="badge-dot"></span>
            <span>Backend · localhost:8001</span>
          </div>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="main-content">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .root-container { height: 100vh; background: #0b0f0c; }
    .sidenav {
      width: 250px;
      background: linear-gradient(180deg, #0f1510 0%, #0b0f0c 100%);
      border-right: 1px solid rgba(255,255,255,0.06) !important;
      display: flex; flex-direction: column; overflow: hidden;
    }
    .nav-logo { display: flex; align-items: center; gap: 12px; padding: 28px 20px 22px; }
    .logo-img { height: 44px; width: auto; filter: brightness(1.1); }
    .logo-labels { display: flex; flex-direction: column; }
    .logo-name { font-size: 1.05rem; font-weight: 700; color: #fff; letter-spacing: 0.5px; }
    .logo-sub { font-size: 0.68rem; color: rgba(255,255,255,0.35); letter-spacing: 1px; text-transform: uppercase; }
    .nav-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 0 16px 16px; }
    .nav-links { flex: 1; display: flex; flex-direction: column; gap: 4px; padding: 0 10px; }
    .nav-item {
      display: flex; align-items: center; gap: 12px; padding: 12px 14px;
      border-radius: 12px; text-decoration: none; color: rgba(255,255,255,0.5);
      font-size: 0.9rem; font-weight: 500; letter-spacing: 0.3px; transition: all 0.25s ease;
    }
    .nav-item:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.06); }
    .nav-icon { font-size: 1.2rem !important; width: 20px !important; height: 20px !important; line-height: 20px !important; }
    .nav-active { color: #6ee76e !important; background: rgba(110,231,110,0.1) !important; border-left: 2px solid #6ee76e; }
    .nav-footer { padding: 16px 20px 24px; border-top: 1px solid rgba(255,255,255,0.06); }
    .nav-badge { display: flex; align-items: center; gap: 8px; font-size: 0.7rem; color: rgba(255,255,255,0.3); }
    .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #6ee76e; box-shadow: 0 0 6px #6ee76e; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    .main-content { background: #0b0f0c; overflow-y: auto; }
  `]
})
export class AppComponent {}
