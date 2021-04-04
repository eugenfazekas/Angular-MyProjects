import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/no_auth/user/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from  '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './components/no_auth/user/registration/registration.component';
import { HeaderComponent } from './components/no_auth/header/header/header.component';
import { UserRestDataSourceService, BASE_URL } from './rest-api/user-rest-data-source.service';
import { UserRepository } from './repositorys/user-repository';
import { NxRouting } from './app.routing';
import { ArticlesComponent } from './components/auth/common/articles/articles.component';
import { AuthService } from './shared/services/auth.service';
import { HomeComponent } from './components/auth/user/home/home.component';
import { AuthGuard} from './shared/guards/auth-guard';
import { SignButtonToggleService } from './shared/services/sign-button-toggle.service';
import { ArticleRestDataSourceService } from './rest-api/article-rest-data-source.service';
import { TokenService } from './shared/services/token.service';
import { CategoriesRestDataSourceService } from './rest-api/categories-rest-data-source.service';
import { CategoriesRepository } from './repositorys/categories-repository';
import { CategoriesComponent } from './components/auth/admin/categories/categories.component';
import { ArticlesRepository } from './repositorys/articles-repository';
import { NxCategoryFilterPipe } from './shared/pipes/nx-article-category-filter.pipe';
import { NxAuthorFilterPipe } from './shared/pipes/nx-article-author-filter.pipe';
import { NxSearchFilterPipe } from './shared/pipes/nx-article-search-filter.pipe';
import { NxPublishedDateFilterPipe } from './shared/pipes/nx-article-published-date-filter.pipe';
import { NxMaterialModule } from './shared/nx-material/nx-material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { EditUserDetailsComponent } from './components/auth/user/edit-user-details/edit-user-details.component';
import { LogLevel, LogService, } from './shared/services/log.service';
import { NxPageFilterPipe } from './shared/pipes/nx-article-page-filter.pipe';
import { ImageService } from './shared/services/image.service';
import { ManageImagesComponent } from './components/auth/user/manage-images/manage-images.component';

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
    EditUserDetailsComponent,
    ManageImagesComponent
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
              UserRepository,
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
            },
            ImageService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }

