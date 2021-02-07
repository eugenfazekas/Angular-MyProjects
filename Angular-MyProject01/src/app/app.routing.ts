import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { ArticlesComponent } from './components/auth/articles/articles.component';
import { HomeComponent } from './components/auth/home/home.component';
import { AuthGuard } from './shared/auth-guard';

const routes: Routes = [
        { path: "", component: HomeComponent , canActivate: [AuthGuard] },
        { path: "login", component: LoginComponent },
        { path: "registration", component: RegistrationComponent },
        { path: "articles", component: ArticlesComponent ,canActivate: [AuthGuard] }
      ]

export const NxRouting = RouterModule.forRoot(routes);