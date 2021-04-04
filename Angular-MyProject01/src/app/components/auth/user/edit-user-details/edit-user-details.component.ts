import { Component, OnInit } from '@angular/core';
import { UserRepository } from 'src/app/repositorys/user-repository';
import { FormBuilder, Validators } from '@angular/forms';
import { MyPasswordValidator } from 'src/app/shared/validators/confirm-password-validator';
import { UserModel } from 'src/app/model/user.model';
import { TokenService } from 'src/app/shared/services/token.service';
import { LogService } from 'src/app/shared/services/log.service';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css']
})
export class EditUserDetailsComponent {

  firstName: string;
  userModel : UserModel = new UserModel();
  editProfile: boolean = false;
  formSubmitted: boolean = false;
  hide = true;

  constructor(public userRepository: UserRepository, private formBuilder: FormBuilder, private tokenService: TokenService,
      private logservice: LogService, public imageService: ImageService) {
      this.logservice.logDebugMessage(String('EditUserDetailsComponent constructor: '));
      this.firstName = tokenService.getFirstName();
  }

    editUserDetailsForm = this.formBuilder.group({ 
            firstName: ['',[ Validators.minLength(3) ]],
            lastName: ['',[ Validators.minLength(3) ]],
            email: ['',[ Validators.minLength(5) ]],
            password: ['',[ Validators.minLength(5)]],
            confirmPassword: ['',[ Validators.minLength(5),  ]],
            address : this.formBuilder.group({
                country: ['',[ Validators.minLength(2) ]],
                city: ['',[ Validators.minLength(3) ]],
                street: ['',[ Validators.minLength(3) ]],
                number: ['',[ Validators.minLength(1) ]],
             })
        },{validator: MyPasswordValidator.ConformPasswordValidator()});

     pacthEditUserDetailsForm(res: UserModel) {
          this.editUserDetailsForm.controls['firstName'].patchValue(res.firstName);
          this.editUserDetailsForm.controls['lastName'].patchValue(res.lastName);
          this.editUserDetailsForm.controls['email'].patchValue(res.email);
          res.address ? this.editUserDetailsForm.patchValue({address : { country : res.address.country }}) : '';
          res.address ? this.editUserDetailsForm.patchValue({address : { city : res.address.city }}): '';
          res.address ? this.editUserDetailsForm.patchValue({address : { street : res.address.street }}): '';
          res.address ? this.editUserDetailsForm.patchValue({address : { number : res.address.number }}): '';
     }         

    enableEdit() {
      this.logservice.logDebugMessage(String('EditUserDetailsComponent enableEdit()'));
      this.editProfile = true;
      this.pacthEditUserDetailsForm(this.userRepository.getUser());
    }

    submitForm() {
      this.userModel.id = this.tokenService.getDecodedToken().id; 
      Object.keys(this.editUserDetailsForm.controls)
            .forEach(c => this.userModel[c] = this.editUserDetailsForm.controls[c].value);
      if(this.editUserDetailsForm.valid){
        this.logservice.logDebugMessage(String('EditUserDetailsComponent submitForm() '));
        this.userRepository.updateUser(this.userModel);
        this.formSubmitted = true;
        this.editProfile = false;
      }
    } 
    
}