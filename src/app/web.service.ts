import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class WebService {
    constructor(private http: HttpClient) { }

    private getHttpOptions(token: string | null = null): { headers: HttpHeaders } {
        let headers = new HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return { headers };
    }

    getUserIdFromToken(token: string): string {
        const decoded: any = jwt_decode(token);
        return decoded.user_id;
    }

    // User related endpoints
    login(username: string, password: string): Observable<any> {
        return this.http.post('http://localhost:8080/api/v1.0/login', { username, password });
    }

    signUp(user: any): Observable<any> {
        return this.http.post('http://localhost:8080/api/v1.0/register', user);
    }

    editUser(id: string, updatedUser: any, token: string): Observable<any> {
        return this.http.put(`http://localhost:8080/api/v1.0/users/${id}`, updatedUser, this.getHttpOptions(token));
    }

    getUser(id: string, token: string): Observable<any> {
        return this.http.get(`http://localhost:8080/api/v1.0/users/${id}`, this.getHttpOptions(token));
    }

    deleteUser(id: string, token: string): Observable<any> {
        return this.http.delete(`http://localhost:8080/api/v1.0/users/${id}`, this.getHttpOptions(token));
    }

    getAllUsers(token: string): Observable<any> {
        return this.http.get('http://localhost:8080/api/v1.0/users', this.getHttpOptions(token));
    }

    // Ticket related endpoints
    submitTicket(title: string, device: string, rebootAttempted: boolean, description: string, userId: string, token: string): Observable<any> {
        const ticket = {
            title,
            device,
            rebootAttempted,
            description,
        };
        return this.http.post(`http://localhost:8080/api/v1.0/users/${userId}/tickets`, ticket, this.getHttpOptions(token));
    }

    editTicket(userId: string, ticketId: string, updatedTicket: any, token: string): Observable<any> {
        return this.http.put(`http://localhost:8080/api/v1.0/users/${userId}/tickets/${ticketId}`, updatedTicket, this.getHttpOptions(token));
    }

    deleteTicket(userId: string, ticketId: string, token: string): Observable<any> {
        return this.http.delete(`http://localhost:8080/api/v1.0/users/${userId}/tickets/${ticketId}`, this.getHttpOptions(token));
    }

    getAllTickets(token: string): Observable<any> {
        return this.http.get('http://localhost:8080/api/v1.0/tickets', this.getHttpOptions(token));
    }

    getClosedTickets(token: string): Observable<any> {
        return this.http.get('http://localhost:8080/api/v1.0/tickets/closed', this.getHttpOptions(token));
    }

    getUserTickets(id: string, token: string): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:8080/api/v1.0/users/${id}/tickets`, this.getHttpOptions(token));
    }
}
