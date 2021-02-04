import { Component } from '@angular/core';
import { UserModel } from 'src/app/model/user.model';
import { UserRegistrationFormGroup } from 'src/app/model/userRegistrationForm.model';
import { UserService } from 'src/app/shared/user.service';
import { UserRestDataSourceService } from 'src/app/shared/user-rest-data-source.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

constructor(private userService: UserService,private _userRestDataSourceService: UserRestDataSourceService) { }

newUser: UserModel = new UserModel();

formGroup: UserRegistrationFormGroup = new UserRegistrationFormGroup(this._userRestDataSourceService);

formSubmitted: boolean = false;

    submitForm() {
        Object.keys(this.formGroup.controls)
            .forEach(c => this.newUser[c] = this.formGroup.controls[c].value);
        this.formSubmitted = true;
        if (this.formGroup.valid) {
            this.userService.saveUser(this.newUser)
            this.newUser = new UserModel();
            this.formGroup.reset();
            this.formSubmitted = false;
        }
    } 

}