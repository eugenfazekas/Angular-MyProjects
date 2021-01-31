import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { UserLoginFormModel } from 'src/app/model/user-login-form.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService ) {}

  userLoginFormModel: UserLoginFormModel = new UserLoginFormModel();

  submitForm(form: NgForm) {
    if(form.valid) {
      this.userService.loginUser(this.userLoginFormModel.email.value ,this.userLoginFormModel.password.value);
    }
  }

}
