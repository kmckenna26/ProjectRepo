import { Component, OnInit } from '@angular/core';
import { WebService } from './web.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  tickets: any[] = [];
  userId: string = '';
  user: any = {};

  constructor(private webService: WebService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (token) {
      this.userId = this.webService.getUserIdFromToken(token);
      this.fetchUser(token);
      this.fetchTickets(token);
    } else {
      console.error('User not logged in');
      this.snackBar.open('User not logged in', 'Close', { duration: 3000 });
    }
  }

  fetchUser(token: string): void {
    this.webService.getUser(this.userId, token).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        this.snackBar.open('Error fetching user', 'Close', { duration: 3000 });
      }
    });
  }

  fetchTickets(token: string): void {
    this.webService.getUserTickets(this.userId, token).subscribe({
      next: (data) => {
        this.tickets = data;
        if (this.tickets.length === 0) {
          this.snackBar.open('No open tickets', 'Close', { duration: 3000 });
        }
      },
      error: (error) => {
        console.error('Error fetching tickets:', error);
        this.snackBar.open('Error fetching tickets', 'Close', { duration: 3000 });
      }
    });
  }
}
