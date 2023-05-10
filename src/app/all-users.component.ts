import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from './web.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: any[] = [];

  constructor(private webService: WebService, private router: Router) { }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.webService.getAllUsers(token).subscribe(
        (response: any[]) => {
          this.users = response;
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    }
  }

  deleteUser(id: string): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      if (confirm('Are you sure? Deleting a user is permanent.')) {
        this.webService.deleteUser(id, token).subscribe(
          () => {
            this.fetchAllUsers();
          },
          (error) => {
            console.error('Error deleting user:', error);
          }
        );
      }
    }
  }

  editUser(id: string): void {
    this.router.navigate(['/edit-user', id]);
  }
} 
  