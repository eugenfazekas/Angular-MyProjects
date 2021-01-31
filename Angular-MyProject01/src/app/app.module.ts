import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, BASE_URL } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/user/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from  '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { HttpClientModule } from '@angular/common/http';
import { NxRouting } from './app.routing';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { HeaderComponent } from './components/header/header/header.component';
import { UserRepository } from "./repositorys/userRepository";
import { UserRestDataSourceService } from './shared/user-rest-data-source.service';
import { UserService } from './shared/user.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NxRouting
  ],
  providers: [
              UserRestDataSourceService,
              UserService,
              UserRepository,
              { provide: BASE_URL, useValue: 'http://localhost:4800'}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }

