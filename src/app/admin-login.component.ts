import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { WebService } from './web.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private webService: WebService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.webService.adminLogin(username, password).subscribe({
        next: (response: any) => {
          console.log('Logged in successfully', response);
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('is_admin', response.is_admin);

            this.router.navigate(['/admin-dashboard']);
        },
        error: (error) => {
          console.error('Error logging in', error);
        },
      });
    }
  }

}