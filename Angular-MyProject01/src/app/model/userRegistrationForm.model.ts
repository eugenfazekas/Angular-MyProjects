import {FormControl, FormGroup, Validators } from '@angular/forms';
import { UserExistFormValidator } from '../shared/user-exist-form-validator.service';

export class UserRegistrationFormControl extends FormControl{

    label: string;
    modelProperty: string;

    constructor(label: string, property: string, value: any, validator: any) {
        super(value,validator);
        this.label = label;
        this.modelProperty = property;
    }

    getValidationMessages() {
        let messages: string[] = [];
        if (this.errors) {
            for (let errorName in this.errors) {
                switch (errorName) {
                    case "required":
                        messages.push(`You must enter a ${this.label}`);
                        break;
                    case "minlength":
                        messages.push(`A ${this.label} must be at least
                            ${this.errors['minlength'].requiredLength} characters`);
                        break;
                    case "maxlength":
                        messages.push(`A ${this.label} must be no more than
                            ${this.errors['maxlength'].requiredLength} characters`);
                        break;
                    case "pattern":
                        messages.push(`The ${this.label} contains illegal characters`);
                        break;   
                }
            }
        }
        return messages;
    }
}


export class UserRegistrationFormGroup extends FormGroup {

    constructor() {
        super({   
                firstName: new UserRegistrationFormControl("FirstName","firstName","",Validators.compose([
                    Validators.required,
                    Validators.pattern("^[A-Za-z]+$"),
                    Validators.minLength(3),
                    Validators.maxLength(15)
                ])),

                lastName: new UserRegistrationFormControl("LastName","lastName","",Validators.compose([
                    Validators.required,
                    Validators.pattern("^[A-Za-z]+$"),
                    Validators.minLength(3),
                    Validators.maxLength(15)
                ])),

                email: new UserRegistrationFormControl("Email","email","",Validators.compose([
                    Validators.required,
                    Validators.pattern("^[\\w-\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
                    Validators.minLength(5),
                    Validators.maxLength(30),
                    UserExistFormValidator.userExist()
                ])),

                password: new UserRegistrationFormControl("Password","password","",Validators.compose([
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(30)
                ]))
        });
    }

    get userControls(): UserRegistrationFormControl[] {
        return Object.keys(this.controls)
            .map(k => this.controls[k] as UserRegistrationFormControl);
    }

    getValidationMessages(name: string): string[] {
        return (this.controls['firstName'] as UserRegistrationFormControl).getValidationMessages();
    }

    getFormValidationMessages() : string[] {
        let messages: string[] = [];
        Object.values(this.controls).forEach(c => 
            messages.push(...(c as UserRegistrationFormControl).getValidationMessages()));
        return messages;
    }

    }