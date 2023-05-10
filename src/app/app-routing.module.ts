import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { AdminLoginComponent } from './admin-login.component';
import { UserLoginComponent } from './user-login.component';
import { UserSignupComponent } from './user-signup.component';
import { UserDashboardComponent } from './user-dashboard.component';
import { SubmitTicketComponent } from './submit-ticket.component';
import { EditDetailsComponent } from './edit-details.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AllUsersComponent } from './all-users.component';
import { EditTicketComponent } from './edit-ticket.component';
import { ClosedTicketsComponent } from './closed-tickets.component';
import { TicketDetailsComponent } from './ticket-details.component';
// Import your other components here

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'admin-login', component: AdminLoginComponent },
    { path: 'user-login', component: UserLoginComponent },
    { path: 'user-signup', component: UserSignupComponent },
    { path: 'user-dashboard', component: UserDashboardComponent },
    { path: 'submit-ticket', component: SubmitTicketComponent},
    { path: 'edit-details', component: EditDetailsComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent},
    { path: 'all-users', component: AllUsersComponent},
    { path: 'edit-ticket', component: EditTicketComponent},
    { path: 'closed-tickets', component: ClosedTicketsComponent},
    { path: 'ticket-details', component: TicketDetailsComponent},
    // Add any other routes here 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
