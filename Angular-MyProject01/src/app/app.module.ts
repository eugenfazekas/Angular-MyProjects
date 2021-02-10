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
import { UserRestDataSourceService, BASE_URL } from './shared/user/user-rest-data-source.service';
import { UserService } from './shared/user/user.service';
import { NxRouting } from './app.routing';
import { ArticlesComponent } from './components/auth/articles/articles.component';
import { AuthService } from './shared/user/auth.service';
import { HomeComponent } from './components/auth/home/home.component';
import { AuthGuard} from './shared/user/auth-guard';
import { SignButtonToggleService } from './shared/user/sign-button-toggle.service';
import { ArticleRestDataSourceService } from './shared/article/article-rest-data-source.service';
import { TokenService } from './shared/user/token.service';
import { CategoriesRestDataSourceService } from './shared/categories/categories-rest-data-source.service';
import { CategoriesRepository } from './repositorys/categories.Repository';
import { CategoriesComponent } from './components/admin/categories/categories.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    ArticlesComponent,
    HomeComponent,
    CategoriesComponent,
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
              SignButtonToggleService,
              TokenService,
              ArticleRestDataSourceService,
              CategoriesRestDataSourceService,
              CategoriesRepository
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }

