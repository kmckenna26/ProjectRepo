import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebService } from './web.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private webService: WebService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      email: ['', [Validators.required, Validators.email]],
      primaryDevice: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signupForm.valid) {
      const user = this.signupForm.value;
      this.webService.signUp(user).subscribe({
        next: (response: any) => {
          console.log('User created successfully', response);
          this.router.navigate(['/user-dashboard']);
        },
        error: (error: any) => {
          console.error('Error creating user', error);
        }
      });
    }
  }
}
