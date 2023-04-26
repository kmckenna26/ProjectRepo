import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from './web.service';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  ticketForm: FormGroup;
  ticketId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private webService: WebService
  ) {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      device: ['', Validators.required],
      rebootAttempted: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.ticketId = '';
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const userId = localStorage.getItem('userId'); // Retrieve the userId from local storage
    this.ticketId = this.route.snapshot.paramMap.get('ticketId') || '';

    if (token && userId && this.ticketId) {
      this.fetchTicket(userId, this.ticketId, token);
    } else {
      console.error('User not logged in or invalid ticketId');
    }
  }

  fetchTicket(userId: string, ticketId: string, token: string): void {
    this.webService.getUserTickets(userId, token).subscribe(
      (tickets) => {
        const ticket = tickets.find(ticket => ticket.id === ticketId);
        if (ticket) {
          this.ticketForm.patchValue(ticket);
        }
      },
      (error: any) => {
        console.error('Error fetching ticket:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (userId && token) {
        const updatedTicket = this.ticketForm.value;
        this.webService.editTicket(userId, this.ticketId, updatedTicket, token).subscribe(
          () => {
            console.log('Ticket updated successfully');
            this.router.navigate(['/admin-dashboard']);
          },
          (error: any) => {
            console.error('Error updating ticket:', error);
          }
        );
      }
    }
  }
}
