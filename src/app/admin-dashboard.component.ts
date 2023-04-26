import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from './web.service';

type Ticket = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
};

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  openTickets: Ticket[] = [];
  highPriorityTickets: Ticket[] = [];

  constructor(private router: Router, private webService: WebService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (token) {
      this.fetchOpenTickets(token);
      this.fetchHighPriorityTickets(token);
    } else {
      console.error('Admin not logged in');
    }
  }

  fetchOpenTickets(token: string): void {
    this.webService.getAllTickets(token).subscribe(
      (data) => {
        this.openTickets = data.filter((ticket: Ticket) => ticket.status === 'open');
      },
      (error) => {
        console.error('Error fetching open tickets:', error);
      }
    );
  }

  fetchHighPriorityTickets(token: string): void {
    this.webService.getAllTickets(token).subscribe(
      (data) => {
        this.highPriorityTickets = data.filter((ticket: Ticket) => ticket.priority === 'high');
      },
      (error) => {
        console.error('Error fetching high priority tickets:', error);
      }
    );
  }

  onLogout(): void {
    this.router.navigate(['/welcome']);
  }
}
