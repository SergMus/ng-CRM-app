import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FormData } from '../auth/login/login.component';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  _isAuth: boolean = false;

  constructor(
    private http: HttpClient,
    private localService: LocalService,
    private router: Router
  ) {}

  login(data: FormData): Observable<any> {
    return this.http.post<any>('https://reqres.in/api/login', data).pipe(
      tap((resp) => {
        this.setToken(resp.token);
        this._isAuth = true;
      })
    );
  }

  logout() {
    this.localService.removeData('TOKEN');
    this.router.navigate(['auth/login']);
  }

  setToken(token: string) {
    this.localService.saveData('TOKEN', token);
  }

  get token() {
    return this.localService.getData('TOKEN');
  }

  isLogined() {
    return this.token ? true : false;
  }
}
