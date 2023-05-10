import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from './web.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-submit-ticket',
  templateUrl: './submit-ticket.component.html',
  styleUrls: ['./submit-ticket.component.css']
})
export class SubmitTicketComponent implements OnInit {
  ticketForm: FormGroup;
  userId: string | null = null;
  token: string | null = null;
  submitted: boolean = false;
  success: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private webService: WebService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.ticketForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(75)]],
      device: ['', Validators.required],
      reboot_attempted: [false, Validators.required],
      description: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token'); // Retrieve the token from local storage
    if (this.token) {
      this.userId = this.webService.getUserIdFromToken(this.token);
      this.isAdmin = this.webService.getIsAdminFromToken(this.token);
      console.log('Token received:', this.token); // Log the token
      console.log('User ID received:', this.userId); // Log the user ID
    } else {
      console.error('User not logged in');
      this.snackBar.open('User not logged in', 'Close', { duration: 3000 });
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.ticketForm.invalid) {
      return;
    }

    const { title, device, reboot_attempted, description } = this.ticketForm.value;

    if (this.userId && this.token) {
      this.webService
        .submitTicket(title, device, reboot_attempted, description, this.userId, this.token)
        .subscribe({
          next: (data) => {
            console.log('Ticket submitted successfully!', data);
            this.success = true;
            this.snackBar.open('Ticket submitted successfully!', 'Close', { duration: 3000 });
            if (this.isAdmin) {
              this.router.navigate(['/admin-dashboard']);
            } else {
              this.router.navigate(['/user-dashboard']);
            }
          },
          error: (error) => {
            console.error('Error submitting ticket:', error);
            this.snackBar.open('Error submitting ticket', 'Close', { duration: 3000 });
          },
        });
    }
  }
}
