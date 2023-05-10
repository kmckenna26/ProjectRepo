import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private loggedIn = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn = this.loggedIn.asObservable();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  checkLoginStatus(): boolean {
    return !!sessionStorage.getItem('token');
  }

  login(): void {
    this.loggedIn.next(true);
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }
}
