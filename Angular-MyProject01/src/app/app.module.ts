import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/user/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from  '@angular/forms';
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
import { CategoriesRepository } from './repositorys/categories-repository';
import { CategoriesComponent } from './components/admin/categories/categories.component';
import { ArticlesRepository } from './repositorys/articles-repository';
import { NxCategoryFilterPipe } from './shared/article/nx-category-filter.pipe';
import { NxAuthorFilterPipe } from './shared/article/nx-author-filter.pipe';
import { NxSearchFilterPipe } from './shared/article/nx-search-filter.pipe';
import { NxPublishedDateFilterPipe } from './shared/article/nx-published-date-filter.pipe';
import { NxMaterialModule } from './shared/nx-material/nx-material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { EditUserDetailsComponent } from './components/user/edit-user-details/edit-user-details.component';
import { LogLevel, LogService, } from './shared/log.service';
import { NxPageFilterPipe } from './shared/article/nx-page-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    ArticlesComponent,
    HomeComponent,
    CategoriesComponent,
    NxCategoryFilterPipe,
    NxAuthorFilterPipe,
    NxSearchFilterPipe,
    NxPublishedDateFilterPipe,
    NxPageFilterPipe,
    EditUserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NxMaterialModule,
    NgxMatFileInputModule,
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
              ArticlesRepository,
              CategoriesRestDataSourceService,
              CategoriesRepository,
              { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
              { provide: LogLevel, useValue: LogLevel.INFO },
              { provide: LogService, 
                deps: [LogLevel],
              useFactory: (level) => {
                  let logger = new LogService();
                  logger.minimumLevel = level;
                  return logger;
              } 
            }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }

