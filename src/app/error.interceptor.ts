import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error) => {
      const status = error?.status;

      if (status) {
        if (status >= 400 && status < 600) {
          const msg = error.error?.message || `Error ${status}: ${error.statusText}`;
          toastr.error(msg, 'Error');
        }

        if (status === 401 || status === 403 ) {
          localStorage.removeItem('token');
          toastr.warning('Session expired—please log in again.', 'Unauthorized');
          router.navigate(['/login']);
        }
      }

      return throwError(() => error);
    })
  );
};
