import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../modules/auth/services/auth.service';
import { take, map } from 'rxjs';
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.user.pipe(
    take(1),
    map((user) => {
      console.log(user);
      const isAuth = !!user;
      if (route.url.findIndex((el) => el.path == 'layout') > -1) {
        if (isAuth) {
          return true;
        } else {
          return router.createUrlTree(['auth']);
        }
      } else {
        if (isAuth) {
          return router.createUrlTree(['layout']);
        } else {
          return true;
        }
      }
    })
  );
  // if (document.cookie.indexOf('user') > -1) {
  //   router.navigate(['layout']);
  //   return false;
  // }
};
