import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLoginFormModel } from 'src/app/model/user-login-form.model';
import { AuthService } from 'src/app/shared/user/auth.service';
import { Router } from '@angular/router';
import { SignButtonToggleService } from 'src/app/shared/user/sign-button-toggle.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userLoginFormModel: UserLoginFormModel = new UserLoginFormModel();

  constructor(private authService: AuthService, private router: Router, private signToogleService: SignButtonToggleService,
              private formBuilder: FormBuilder) {
    this.signToogleService.name = '';
    this.signToogleService.setLoggedIn(false);
  }
 
  loginForm = this.formBuilder.group({ email: this.userLoginFormModel.email , password: this.userLoginFormModel.password});

  submitForm() {
    if(this.loginForm.valid) {
      this.authService.loginUser(this.userLoginFormModel.email.value ,this.userLoginFormModel.password.value).subscribe(
        res =>  { this.signToogleService.setLoggedIn(true);
                  this.signToogleService.setFullname();
                   return  res == true ? this.router.navigateByUrl('') : this.router.navigateByUrl('login') }
           ) 
       }
    }
  }

