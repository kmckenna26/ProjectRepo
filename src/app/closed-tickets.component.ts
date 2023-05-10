import { Component, OnInit } from '@angular/core';
import { WebService } from './web.service';

@Component({
  selector: 'app-closed-tickets',
  templateUrl: './closed-tickets.component.html',
  styleUrls: ['./closed-tickets.component.css']
})
export class ClosedTicketsComponent implements OnInit {
  closedTickets: any[] = [];

  constructor(private webService: WebService) { }

  ngOnInit(): void {
    this.fetchClosedTickets();
  }

  fetchClosedTickets(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.webService.getClosedTickets(token).subscribe(
        (response: any[]) => {
          this.closedTickets = response;
        },
        (error) => {
          console.error('Error fetching closed tickets:', error);
        }
      );
    }
  }

  deleteTicket(id: string): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      if (confirm('Are you sure? Deleting a ticket is permanent.')) {
        this.webService.deleteTicket(id, token).subscribe(
          () => {
            this.fetchClosedTickets();
          },
          (error) => {
            console.error('Error deleting ticket:', error);
          }
        ); 
      }
    }
  }

  editTicket(id: string): void {
    // Redirect to the edit ticket page for the selected ticket
    // Replace this with the actual logic to navigate to the edit ticket page
    console.log('Edit ticket with ID:', id);
  }
}
