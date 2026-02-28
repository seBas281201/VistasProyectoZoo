import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'animales', pathMatch: 'full' },

  {
    path: 'animales',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/animales/animales-list.component').then(m => m.AnimalesListComponent)
      },
      {
        path: 'nuevo',
        loadComponent: () =>
          import('./features/animales/animal-form.component').then(m => m.AnimalFormComponent)
      },
      {
        path: 'editar/:id',
        loadComponent: () =>
          import('./features/animales/animal-form.component').then(m => m.AnimalFormComponent)
      }
    ]
  },

  {
    path: 'alimentacion',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/alimentacion/alimentacion-list.component').then(m => m.AlimentacionListComponent)
      },
      {
        path: 'nuevo',
        loadComponent: () =>
          import('./features/alimentacion/alimentacion-form.component').then(m => m.AlimentacionFormComponent)
      },
      {
        path: 'editar/:id',
        loadComponent: () =>
          import('./features/alimentacion/alimentacion-form.component').then(m => m.AlimentacionFormComponent)
      }
    ]
  },

  {
    path: 'citas',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/citas/citas-list.component').then(m => m.CitasListComponent)
      },
      {
        path: 'nuevo',
        loadComponent: () =>
          import('./features/citas/cita-form.component').then(m => m.CitaFormComponent)
      },
      {
        path: 'editar/:id',
        loadComponent: () =>
          import('./features/citas/cita-form.component').then(m => m.CitaFormComponent)
      }
    ]
  },

  {
    path: 'usuarios',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/usuarios/usuarios-list.component').then(m => m.UsuariosListComponent)
      },
      {
        path: 'nuevo',
        loadComponent: () =>
          import('./features/usuarios/usuario-form.component').then(m => m.UsuarioFormComponent)
      },
      {
        path: 'editar/:id',
        loadComponent: () =>
          import('./features/usuarios/usuario-form.component').then(m => m.UsuarioFormComponent)
      }
    ]
  },

  { path: '**', redirectTo: 'animales' }
];
