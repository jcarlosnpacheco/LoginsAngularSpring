import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

import { MenuItem } from './generic/models/MenuItem';
import { LoaderService } from './generic/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  menuItems: MenuItem[] = [];
  menuOpened = false;
  isLogged$ = this.authService.logged();
  isAdmin$ = this.authService.getIsAdmin();
  isAdmin = false;

  constructor(
    public loaderService: LoaderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isAdmin$.subscribe((flagAdmin) => (this.isAdmin = flagAdmin));
  }

  ngAfterViewInit(): void {
    this.getCredentials();
    this.isAdmin$ = this.authService.getIsAdmin();
  }

  openCloseMenu(): void {
    this.menuOpened = !this.menuOpened;
  }

  private getCredentials(): void {
    if (this.router.url.includes('signup')) {
      this.router.navigate(['/signup']);
    }
    if (!this.authService.hasToken()) {
      this.router.navigate(['']);
    }
  }
}
