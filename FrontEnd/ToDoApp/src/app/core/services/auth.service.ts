import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  apiUrl: string = environment.apiUrl;
  tokenKey: string = 'auth-token';

  login(username: string, password: string): Observable<string> {
    const body = { userName: username, password: password };
  
    return this.http.post(`${this.apiUrl}/login`, body, { responseType: 'text' }).pipe(
      tap((obj) => {
        let key: string = obj;
        sessionStorage.setItem(this.tokenKey, key);
      }),
      catchError((error) => {
        sessionStorage.removeItem(this.tokenKey);
        return of(''); 
      })
    );
  }

  register(username: string, password: string): Observable<string> {
    const body = { userName: username, password: password };
  
    return this.http.post(`${this.apiUrl}/register`, body, { responseType: 'text' }).pipe(
      tap((obj) => {
        console.log('Registration successful:', obj);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          console.error('Registration error: User already exists');
          return of('User already exists');
        }
        console.error('Registration error:', error);
        return of('Registration failed');
      })
    );
  }

  logout() {
    sessionStorage.removeItem(this.tokenKey);
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }
}
