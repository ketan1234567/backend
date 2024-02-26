import { CanActivate, CanActivateFn, Router } from '@angular/router';

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if user is authenticated (e.g., check if token exists in local storage)
    const isAuthenticated = localStorage.getItem('token') !== null;
    if (!isAuthenticated) {
      // If user is not authenticated, redirect to the login page
      this.router.navigate(['/login']);
    }
    return isAuthenticated; // Return true if user is authenticated, false otherwise
  }
}