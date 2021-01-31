import { FormControl } from '@angular/forms';
import { UserRepository } from '../repositorys/userRepository';

export class UserExistFormValidator {

  static userExist() {
    
  return (control: FormControl) : {[key: string]: any} => {
      let userRepo: UserRepository;
      let val = String(control.value);
    
      if(!userRepo.getUser(val)&& typeof(val) != 'undefined' && val != '') {
          return {"UserExist!" : {"userExist": val, "actualValue": val}};
      }else {
          return null;
      }
    }
 
}

}
