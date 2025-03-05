import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  let authService:AuthService=inject(AuthService);
  let router:Router=inject(Router);
  if(authService.userData()===null){
    return true;
  }
  router.navigate(['/home']);
  return false;
};
