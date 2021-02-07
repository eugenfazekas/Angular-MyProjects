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
import { ArticlesComponent } from './components/auth/articles/articles.component';
import { AuthService } from './shared/auth.service';
import { HomeComponent } from './components/auth/home/home.component';
import { AuthGuard} from './shared/auth-guard';
import { SignToggleService } from './shared/sign-toggle.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    ArticlesComponent,
    HomeComponent,
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
              AuthService,
              AuthGuard,
              SignToggleService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }

