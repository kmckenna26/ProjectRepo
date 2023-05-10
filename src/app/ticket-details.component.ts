import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from './web.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  ticket: any;
  ticketId: string | null = null;
  token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private webService: WebService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token'); // Retrieve the token from local storage
    if (this.token) {
      this.ticketId = this.route.snapshot.paramMap.get('id');
      console.log('Token received:', this.token); // Log the token
      console.log('Ticket ID received:', this.ticketId); // Log the ticket ID
      if (this.ticketId) this.fetchTicket();
    } else {
      console.error('User not logged in');
      this.snackBar.open('User not logged in', 'Close', { duration: 3000 });
    }
  }

  fetchTicket(): void {
    if (this.ticketId && this.token) {
      this.webService.getTicket(this.ticketId, this.token).subscribe(
        (ticket: any) => {
          this.ticket = ticket;
          console.log('Ticket data received:', this.ticket);
        },
        (error) => {
          console.error('Error fetching ticket details:', error);
          this.snackBar.open('Error fetching ticket', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
