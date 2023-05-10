import { Component, OnInit } from '@angular/core';
import { WebService } from './web.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-closed-tickets',
  templateUrl: './closed-tickets.component.html',
  styleUrls: ['./closed-tickets.component.css']
})
export class ClosedTicketsComponent implements OnInit {
  closedTickets: any[] = [];

  constructor(private webService: WebService, private router: Router) { }

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

  goToEditTicket(ticketId: string): void {
    this.router.navigate([`/edit-ticket/${ticketId}`]);
  }
}
 