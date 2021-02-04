import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';

const routes: Routes = [
        { path: "registration", component: RegistrationComponent },
        { path: "", component: LoginComponent }
      ]

export const NxRouting = RouterModule.forRoot(routes);