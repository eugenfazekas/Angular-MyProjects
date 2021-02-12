import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLoginFormModel } from 'src/app/model/user-login-form.model';
import { AuthService } from 'src/app/shared/user/auth.service';
import { Router } from '@angular/router';
import { SignButtonToggleService } from 'src/app/shared/user/sign-button-toggle.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

 
  constructor(private authService: AuthService, private router: Router, private signToogleService: SignButtonToggleService) {
    this.signToogleService.name = '';
    this.signToogleService.setLoggedIn(false);
  }


  userLoginFormModel: UserLoginFormModel = new UserLoginFormModel();

  submitForm(form: NgForm) {
    if(form.valid) {
      this.authService.loginUser(this.userLoginFormModel.email.value ,this.userLoginFormModel.password.value).subscribe(
        res =>  { this.signToogleService.setLoggedIn(true);
                  this.signToogleService.setFullname();
                   return  res == true ? this.router.navigateByUrl('') : this.router.navigateByUrl('login') }
           ) 
       }
    }
  }

