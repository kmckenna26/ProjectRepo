import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebService } from './web.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {
  editForm: FormGroup;
  userId: string | null = null;
  token: string | null = null;
  currentUser$: any;
  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private webService: WebService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute here
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      email: ['', [Validators.required, Validators.email]],
      primaryDevice: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.minLength(8)]
    });
  }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token'); // Retrieve the token from local storage
    if (this.token) {
      this.isAdmin = this.webService.getIsAdminFromToken(this.token);
      this.route.params.subscribe(params => {
        this.userId = params['userId'];
      });
      console.log('Token received:', this.token); // Log the token
      console.log('User ID received:', this.userId); // Log  the user ID
      this.fetchUser(this.token);
    } else {
      console.error('User not logged in');
      this.snackBar.open('User not logged in', 'Close', { duration: 3000 });
    }
  }

  fetchUser(token: string): void {
    if (this.userId) {
      this.webService.getUser(this.userId, token).subscribe({
        next: (data) => {
          this.currentUser$ = data;
          console.log('User data received:', this.currentUser$);
  
          // Set form values with the received user data
          this.editForm.patchValue({
            name: this.currentUser$.name,
            dob: this.currentUser$.dob,
            phone: this.currentUser$.phone,
            email: this.currentUser$.email,
            primaryDevice: this.currentUser$.primaryDevice,
            username: this.currentUser$.username
          });
        },
        error: (error) => {
          console.error('Error fetching user:', error);
          this.snackBar.open('Error fetching user', 'Close', { duration: 3000 });
        }
      });
    }
  }
  
  saveChanges(): void {
    if (this.editForm.valid) {
      const updatedUser = {
        ...this.editForm.value,
        password: this.editForm.value.newPassword
      };
      delete updatedUser.currentPassword;
      delete updatedUser.newPassword;
  
      if (this.userId && this.token) {
        this.webService.editUser(this.userId, updatedUser, this.token).subscribe(
          () => {
            console.log('User details updated:', updatedUser);
            this.snackBar.open('User details updated', 'Close', { duration: 3000 });
            if (this.isAdmin) {
              this.router.navigate(['/all-users']);
            } else {
              this.router.navigate(['/user-dashboard']);
            }
          },
          (error) => {
            console.error('Error updating user details:', error);
            this.snackBar.open('Error updating user details', 'Close', { duration: 3000 });
          }
        );
      }
    }
  }
}
  