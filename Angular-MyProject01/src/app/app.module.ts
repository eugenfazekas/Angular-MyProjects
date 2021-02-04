import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/user/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from  '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { HeaderComponent } from './components/header/header/header.component';
import { UserRestDataSourceService, BASE_URL } from './shared/user-rest-data-source.service';
import { UserService } from './shared/user.service';
import { NxRouting } from './app.routing';


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
              { provide: BASE_URL, useValue: 'http://localhost:4800'},
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }

