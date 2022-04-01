import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthenticateResult } from '../models/authenticate-result.model';
import { Logon } from '../models/logon.model';
import { Signup } from '../models/signup.model';
import { ResponseGeneric } from './../models/response-generic';
import { Role } from './../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedState = new BehaviorSubject<boolean>(false);
  private accessToken = 'access_token';
  private urlLogon = `${environment.apiUrl}/auth`;
  private isAdminSubcject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  logged() {
    this.loggedState.next(this.hasToken());
    return this.loggedState.asObservable();
  }

  logon(logon: Logon): Observable<AuthenticateResult> {
    return this.http
      .post<AuthenticateResult>(`${this.urlLogon}/signin`, logon)
      .pipe(
        tap((resp) => {
          this.setSession(resp);
          window.location.reload();
        })
      );
  }

  logoff() {
    this.cleanSession();
  }

  reset(logon: Logon): Observable<ResponseGeneric> {
    return this.http.put<ResponseGeneric>(`${this.urlLogon}/resetPass`, logon);
  }

  signup(signup: Signup): Observable<ResponseGeneric> {
    return this.http.post<ResponseGeneric>(`${this.urlLogon}/signup`, signup);
  }

  getToken(): string | null {
    return localStorage.getItem(this.accessToken);
  }

  getExpiration(): any {
    const tokenDecoded = this.getTokenDecoded();

    if (tokenDecoded === null) {
      return null;
    }

    return tokenDecoded.exp;
  }

  getInitialDateSession(): any {
    const tokenDecoded = this.getTokenDecoded();

    if (tokenDecoded === null) {
      return null;
    }

    return tokenDecoded.iat;
  }

  hasToken(): boolean {
    return this.getToken() !== null;
  }

  getTokenDecoded(): any {
    const token = this.getToken();

    if (token) {
      return jwt_decode(token);
    }

    return null;
  }

  getIdFromToken(): number | null {
    const tokenDecoded = this.getTokenDecoded();

    if (!tokenDecoded) {
      return null;
    }

    return tokenDecoded.ID;
  }

  getRolesFromToken(): Role[] | null {
    const tokenDecoded = this.getTokenDecoded();

    if (!tokenDecoded) {
      return null;
    }

    return tokenDecoded.AUTHORITIES_KEY;
  }

  setIsAdmin(): boolean {
    const roles = this.getRolesFromToken();

    if (!roles) {
      return false;
    }

    if (roles.some((r) => r.authority === 'ROLE_ADMIN')) {
      return true;
    } else {
      return false;
    }
  }

  getIsAdmin() {
    this.isAdminSubcject.next(this.setIsAdmin());
    return this.isAdminSubcject.asObservable();
  }

  private setSession(authResult: AuthenticateResult) {
    localStorage.clear();
    localStorage.setItem(this.accessToken, authResult.token);
    this.loggedState.next(this.hasToken());
    this.getIsAdmin();
  }

  private cleanSession() {
    localStorage.removeItem(this.accessToken);
    this.loggedState.next(this.hasToken());
    this.isAdminSubcject.next(this.setIsAdmin());
  }
}
