import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';
import { AdminLoginComponent } from './admin-login.component';
import { UserLoginComponent } from './user-login.component';
import { UserSignupComponent } from './user-signup.component';
import { SubmitTicketComponent } from './submit-ticket.component';
import { EditDetailsComponent } from './edit-details.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavBarComponent } from './nav-bar.component';
import { UserDashboardComponent } from './user-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { WebService } from './web.service';
import { AllUsersComponent } from './all-users.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditTicketComponent } from './edit-ticket.component';
import { ClosedTicketsComponent } from './closed-tickets.component';
import { FooterComponent } from './footer.component';
import { TicketDetailsComponent } from './ticket-details.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AdminLoginComponent,
    UserLoginComponent,
    UserSignupComponent,
    SubmitTicketComponent,
    EditDetailsComponent,
    AdminDashboardComponent,
    NavBarComponent,
    UserDashboardComponent,
    AllUsersComponent,
    EditTicketComponent,
    ClosedTicketsComponent,
    FooterComponent,
    TicketDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
