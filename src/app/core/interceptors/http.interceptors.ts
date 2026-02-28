import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const url = req.url.startsWith('http') ? req.url : `${environment.apiUrl}${req.url}`;
  const cloned = req.clone({ url });
  return next(cloned);
};

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let message = `Error ${err.status}`;

      if (err.status === 0) {
        message = 'No se puede conectar con el servidor (puerto 8001).';
      } else if (err.error && typeof err.error === 'string') {
        message = err.error;
      } else if (err.error && typeof err.error === 'object' && err.error.error) {
        message = err.error.error;
      } else if (err.error && typeof err.error === 'object') {
        const firstKey = Object.keys(err.error)[0];
        const firstVal = err.error[firstKey];
        if (firstKey && typeof firstVal === 'string') {
          message = firstVal;
        }
      }

      snackBar.open(message, 'Cerrar', {
        duration: 5000,
        panelClass: ['snack-error']
      });

      return throwError(() => err);
    })
  );
};