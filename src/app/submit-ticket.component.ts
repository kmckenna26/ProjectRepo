import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { WebService } from './web.service';

@Component({
  selector: 'app-submit-ticket',
  templateUrl: './submit-ticket.component.html',
  styleUrls: ['./submit-ticket.component.css']
})
export class SubmitTicketComponent implements OnInit {
  ticketForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private webService: WebService
  ) {
    this.ticketForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(75)]],
      device: ['', Validators.required],
      rebootAttempted: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true;

    if (this.ticketForm.invalid) {
      return;
    }

    const { title, device, rebootAttempted, description } = this.ticketForm.value;
    const userId = this.authService.getUserId();
    const token = this.authService.getToken();

    if (userId && token) {
      this.webService
        .submitTicket(title, device, rebootAttempted, description, userId, token)
        .subscribe({
          next: (data) => {
            console.log('Ticket submitted successfully!', data);
            this.success = true;
          },
          error: (error) => {
            console.error('Error submitting ticket:', error);
          },
        });
    }
  }
}
