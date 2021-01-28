import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginService) {}

  email = new FormControl ('', [Validators .required, Validators.email]);
  password = new FormControl ('', [Validators .required]);
  info: string;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  submitForm(form: NgForm) {
    if(form.valid) {
      this.loginService.loginUser(this.email.value ,this.password.value).subscribe(
        res => {
          this.info = res;
        },
        err => {
          console.log(err)
        }
      );
    }
  }

}
