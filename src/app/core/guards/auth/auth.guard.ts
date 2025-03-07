import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService: AuthService = inject(AuthService);
  let router: Router = inject(Router);

  // 🛑 If no token is found in localStorage, immediately deny access
  const token = localStorage.getItem('user token');
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // ✅ If userData is already set, allow access
  if (authService.userData() !== null) {
    return true;
  }

  // 🚀 Attempt to restore user data from token
  authService.restoreUserData();

  // 🛑 Check again after restore attempt
  if (authService.userData() === null) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
