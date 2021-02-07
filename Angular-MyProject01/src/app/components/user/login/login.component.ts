import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { UserLoginFormModel } from 'src/app/model/user-login-form.model';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/user.model';
import { map } from 'rxjs/operators';
import { SignToggleService } from 'src/app/shared/sign-toggle.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loggedIn: boolean;
  constructor(private authService: AuthService, private router: Router, private signToogleService: SignToggleService) {}

  userLoginFormModel: UserLoginFormModel = new UserLoginFormModel();

  submitForm(form: NgForm) {
    if(form.valid) {
      this.authService.loginUser(this.userLoginFormModel.email.value ,this.userLoginFormModel.password.value).subscribe(
        res =>  {
           this.signToogleService.setLoggedIn(true);
           return  res ? this.router.navigateByUrl('') : this.router.navigateByUrl('login')}
           ) 
       }
    }
  }

