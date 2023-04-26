import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

    constructor(private router: Router) { }

    goToAdminLogin(): void {
        this.router.navigate(['/admin-login']);
    }

    goToUserLogin(): void {
        this.router.navigate(['/user-login']);
    }

    goToUserSignup(): void {
        this.router.navigate(['/user-signup']);
    }
}
