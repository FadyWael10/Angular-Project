import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

export const RoleGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);

  const userRole = localStorage.getItem('role'); 

  if (userRole === 'admin') { 
    return true;
  }

  return router.createUrlTree(['/home']); 
};
