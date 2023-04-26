import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { WebService } from './web.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {
  editForm: FormGroup;
  userId: string | null = null;
  token: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private webService: WebService
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      email: ['', [Validators.required, Validators.email]],
      primaryDevice: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.token = this.authService.getToken();
    if (this.userId && this.token) {
      this.webService.getUser(this.userId, this.token).subscribe((response: any) => {
        this.editForm.setValue({
          name: response.name,
          phone: response.phone,
          email: response.email,
          primaryDevice: response.primaryDevice
        });
      });
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedUser = this.editForm.value;
      if (this.userId && this.token) {
        this.webService.editUser(this.userId, updatedUser, this.token).subscribe(() => {
          console.log('User details updated:', updatedUser);
        });
      }
    }
  }
}
