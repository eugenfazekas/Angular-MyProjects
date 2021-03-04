import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MyPasswordValidator } from 'src/app/shared/user/confirm-password-validator';
import { UserModel } from 'src/app/model/user.model';
import { TokenService } from 'src/app/shared/user/token.service';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css']
})
export class EditUserDetailsComponent {

  userModel: UserModel = null;
  editProfile: boolean = false;
  formSubmitted: boolean = false;
  hide = true;
  
  constructor(private userService: UserService, private formBuilder: FormBuilder, private tokenService: TokenService) {
    this.userService.getUser(tokenService.getEmail()).subscribe(
      res => { this.userModel = res;
              this.editUserDetailsForm.controls['firstName'].patchValue(res.firstName);
              this.editUserDetailsForm.controls['lastName'].patchValue(res.lastName);
              this.editUserDetailsForm.controls['email'].patchValue(res.email);
              this.editUserDetailsForm.patchValue({address : { country : res.address.country }});
              this.editUserDetailsForm.patchValue({address : { city : res.address.city }});
              this.editUserDetailsForm.patchValue({address : { street : res.address.street }});
              this.editUserDetailsForm.patchValue({address : { number : res.address.number }});
      }
    )
  }

    editUserDetailsForm = this.formBuilder.group({ 
            firstName: ['',[ Validators.minLength(3) ]],
            lastName: ['',[ Validators.minLength(3) ]],
            email: ['',[ Validators.minLength(5) ]],
            password: ['',[ Validators.minLength(5)]],
            confirmPassword: ['',[ Validators.minLength(5),  ]],
            address : this.formBuilder.group({
                country: ['',[ Validators.minLength(3) ]],
                city: ['',[ Validators.minLength(3) ]],
                street: ['',[ Validators.minLength(3) ]],
                number: ['',[ Validators.minLength(1) ]],
             })
        },{validator: MyPasswordValidator.ConformPasswordValidator()});

    enableEdit() {
      this.editProfile = true;
    }

    submitForm() {
      Object.keys(this.editUserDetailsForm.controls)
            .forEach(c => this.userModel[c] = this.editUserDetailsForm.controls[c].value);
      if(this.editUserDetailsForm.valid){
        this.userService.updateUser(this.userModel).subscribe(
          res => console.log(res)
        );
        this.formSubmitted = true;
      }
    }   
}