import { Injectable } from "@angular/core";
import { CanActivate,Router } from "@angular/router";



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const jwtTok = localStorage.getItem('jwt');

    if (jwtTok) {
      return true; 
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}