import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.isAuthenticatedSubject.asObservable();
  private userId: string | null = null;
  private token: string | null = null;

  constructor(private http: HttpClient) {
    this.userId = localStorage.getItem('userId');
    this.token = localStorage.getItem('token');
    if (this.userId) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(username: string, password: string): Observable<any> {
    const url = 'http://localhost:8080/api/v1.0/login';
    return this.http.post<any>(url, { username, password }).pipe(
      tap((response) => {
        console.log('Login response:', response);

        if (response && response.user_id && response.token) {
          localStorage.setItem('userId', response.user_id);
          localStorage.setItem('token', response.token);
          this.userId = response.user_id;
          this.token = response.token;
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.userId = null;
    this.token = null;
    this.isAuthenticatedSubject.next(false);
  }

  getUserId(): string | null {
    return this.userId;
  }

  getToken(): string | null {
    return this.token;
  }
}
