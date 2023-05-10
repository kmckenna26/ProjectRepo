import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebService } from './web.service';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  ticketForm: FormGroup;
  ticketId: string | null = null;
  currentTicket$: any;
  token: string | null = null;
  isAdmin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private webService: WebService,
    private snackBar: MatSnackBar
  ) {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      device: ['', Validators.required],
      reboot_attempted: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token'); // Retrieve the token from local storage
    this.route.params.subscribe(params => {
      this.ticketId = params['ticketId'];
      if (this.token && this.ticketId) {
        this.fetchTicket(this.token, this.ticketId);
      } else {
        console.error('User not logged in or invalid ticketId');
      }
    });
  }
  

  fetchTicket(token: string, ticketId: string): void {
    this.webService.getTicket(ticketId, token).subscribe(
      (ticket) => {
        this.currentTicket$ = ticket;
        console.log('Ticket data received:', this.currentTicket$);
        this.ticketForm.patchValue(ticket);
      },
      (error: any) => {
        console.error('Error fetching ticket:', error);
      }
    );
  }

  saveChanges(): void {
    if (this.ticketForm.valid) {
      const updatedTicket = this.ticketForm.value;
      if (this.ticketId && this.token) {
        this.webService.editTicket(this.ticketId, updatedTicket, this.token).subscribe(
          () => {
            console.log('Ticket updated successfully');
            this.snackBar.open('Ticket updated successfully', 'Close', { duration: 3000 });
            this.router.navigate(['/admin-dashboard']);
          },
          (error: any) => {
            console.error('Error updating ticket:', error);
            this.snackBar.open('Error updating ticket', 'Close', { duration: 3000 });
          }
        );
      }
    }
  }
}
 