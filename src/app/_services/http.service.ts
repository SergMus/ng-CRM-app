import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, Observable, tap, map } from 'rxjs';
import { Customer } from '../models/customer';
import { User, UserEndponit } from '../models/user';
import { httpError } from './http-error.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http
      .get<UserEndponit>(`https://reqres.in/api/users/${id}`)
      .pipe(
        map((resp: UserEndponit) => {
          return resp.data;
        }),
        catchError(httpError)
      );
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`https://dummyjson.com/users/${id}`);
  }

  getCustomers(): Observable<Customer[]> {
    let params = new HttpParams();
    params = params.appendAll({
      select: ['id,firstName,lastName,image,phone,email'],
    });

    return this.http
      .get<Customer[]>('https://dummyjson.com/users', { params })
      .pipe(catchError(httpError));
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      'https://dummyjson.com/users/add',
      customer
    );
  }
}
