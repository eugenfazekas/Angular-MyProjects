import { FormControl,Validators } from '@angular/forms';

export class UserLoginFormModel {

    email = new FormControl ('', [Validators .required, Validators.email]);
    password = new FormControl ('', [Validators .required]);
    
    getEmailErrorMessage() {
      if (this.email.hasError('required')) {
        return 'You must enter a value';
      }
  
      return this.email.hasError('email') ? 'Not a valid email' : '';
    }

    getPasswordErrorMessage() {
        if (this.password.hasError('required')) {
          return 'You must enter a password';
        }
    
        return this.password.hasError('password') ? 'Not a valid email' : '';
      }
}
