import { Component, OnInit } from '@angular/core';
import { WebService } from './web.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-closed-tickets',
  templateUrl: './closed-tickets.component.html',
  styleUrls: ['./closed-tickets.component.css']
})
export class ClosedTicketsComponent implements OnInit {
  tickets: any[] = [];

  constructor(private webService: WebService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.fetchClosedTickets(token);
    } else {
      console.error('User not logged in');
      this.snackBar.open('User not logged in', 'Close', { duration: 3000 });
    }
  }

  fetchClosedTickets(token: string): void {
    this.webService.getClosedTickets(token).subscribe(
      (data) => {
        this.tickets = data;
      },
      (error) => {
        console.error('Error fetching closed tickets:', error);
        this.snackBar.open('Error fetching closed tickets', 'Close', { duration: 3000 });
      }
    );
  }
}
