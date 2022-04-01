import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { RegisterLogin } from '../models/register-login';
import { ResponseCreateRegisterLogin } from '../models/response-create-register-login';

@Injectable({
  providedIn: 'root',
})
export class RegisterLoginService {
  private urlRegister = `${environment.apiUrl}/RegisterLogin`;

  constructor(private http: HttpClient) {}

  delete(userId: number, id: number): Observable<any> {
    return this.http.delete(`${this.urlRegister}?id=${id}&userId=${userId}`);
  }

  getAllByRegisterName(
    userId: number,
    name: string,
    observation: string
  ): Observable<RegisterLogin[]> {
    return this.http.get<RegisterLogin[]>(
      `${this.urlRegister}/GetByName?userId=${userId}&name=${name}&obs=${observation}`
    );
  }

  getById(userId: number, id: number): Observable<RegisterLogin[]> {
    return this.http.get<RegisterLogin[]>(
      `${this.urlRegister}/GetById?id=${id}&userId=${userId}`
    );
  }

  getAll(userId: number): Observable<RegisterLogin[]> {
    return this.http.get<RegisterLogin[]>(
      `${this.urlRegister}?userId=${userId}`
    );
  }

  create(
    registerLogin: RegisterLogin
  ): Observable<ResponseCreateRegisterLogin> {
    return this.http.post<ResponseCreateRegisterLogin>(
      this.urlRegister,
      registerLogin
    );
  }

  update(register: RegisterLogin): Observable<ResponseCreateRegisterLogin> {
    return this.http.put<ResponseCreateRegisterLogin>(
      this.urlRegister,
      register
    );
  }
}
