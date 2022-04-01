/*import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean>{
      return this.authService.logged
      .pipe(
        switchMap((isLoggedIn) => {
          if (!isLoggedIn){
            this.router.navigate(['/']);
            return false;
          }
          return true;
        });
      )

  }

}*/
