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
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();
  private userId: string | null = null;
  private token: string | null = null;

  constructor(private http: HttpClient) {
    this.setCredentialsFromStorage();
  }

  setCredentialsFromStorage(): void {
    this.userId = sessionStorage.getItem('userId');
    this.token = sessionStorage.getItem('token');
    if (this.userId && this.token) {
      this.isAuthenticatedSubject.next(true);
      this.userDataSubject.next({ user_id: this.userId, token: this.token });
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

  login(username: string, password: string): Observable<any> {
    const url = 'http://localhost:8080/api/v1.0/login';
    return this.http.post<any>(url, { username, password }).pipe(
      tap((response) => {
        if (response && response.user_id && response.token) {
          sessionStorage.setItem('userId', response.user_id);
          sessionStorage.setItem('token', response.token);
          this.userId = response.user_id;
          this.token = response.token;
          this.isAuthenticatedSubject.next(true);
          this.userDataSubject.next(response); // Emit the user's data

          console.log('Token stored in AuthService:', this.token); // Log the stored token
        }
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
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
