import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>('http://127.0.0.1:8080/api/v1/auth', {withCredentials: true}).pipe(
      map(authenticated => {
        console.log(authenticated);
        return authenticated;

      }),
      catchError(error => {
        console.error('Error checking authentication status', error);
        return of(false);
      })
    );
  }
}
