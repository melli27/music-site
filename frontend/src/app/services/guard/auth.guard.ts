import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {inject} from '@angular/core';
import {catchError, map, of} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router:Router = inject(Router);
  return authService.isAuthenticated().pipe(
    map(authenticated => {
      console.log(authenticated);
      if (!authenticated) {
        router.navigate(['']);
        return false;
      }
      return true;
    }),
    catchError(error => {
      console.error('Error checking authentication status', error);
      router.navigate(['']);
      return of(false);
    })
  );
};
