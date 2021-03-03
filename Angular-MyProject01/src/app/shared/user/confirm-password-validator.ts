import { ValidatorFn, AbstractControl } from '@angular/forms';
import { PasswordService } from './password.service';

export class MyPasswordValidator {

      static PasswordValidator(passwordService: PasswordService): ValidatorFn  {
            return (thisControl: AbstractControl): {[key: string]: any} | null => {
                passwordService.setPassword(thisControl.value);
                return null;
              };
      }

      static ConformPasswordValidator(passwordService: PasswordService): ValidatorFn  {
        return (thisControl: AbstractControl): {[key: string]: any} | null => {
            let thisVal = thisControl.value;
            return passwordService.getPassword() == thisVal ?  null :  {"passwordMissMatch" : {  "actualValue": thisVal}};
          };
  }
}
