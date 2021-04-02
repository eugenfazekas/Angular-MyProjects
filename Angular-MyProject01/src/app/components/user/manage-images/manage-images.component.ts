import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user/user.service';
import { ImageService } from 'src/app/shared/image.service';
import { UserModel } from 'src/app/model/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { TokenService } from 'src/app/shared/user/token.service';
import { LogService } from 'src/app/shared/log.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-manage-images',
  templateUrl: './manage-images.component.html',
  styleUrls: ['./manage-images.component.css']
})
export class ManageImagesComponent implements OnInit {

  firstName: string;
  userModel: UserModel = new UserModel();
  editProfile: boolean = false;
  formSubmitted: boolean = false;
  hide = true;
  accept: string[] = ['.jpg','.png','.jpeg'];
  multiple:boolean = false;
  imageIndex: number = 0;
  
  constructor(  private tokenService: TokenService, private formBuilder: FormBuilder, private logService: LogService,
                public userService: UserService, public imageService: ImageService) {
                  this.firstName = tokenService.getFirstName();
                 }

  ngOnInit(): void {
  }

  imageUploadForm = this.formBuilder.group({  
    image: ['',[Validators.pattern('[^Ω]+'),Validators.required]], 
  })
       

onChange(event) {
this.logService.logDebugMessage(String('EditUserDetailsComponent onChange() '));
this.imageService.inputService(this.imageUploadForm.controls['image'].value);
}

getImageTitle(id: string): string {
this.logService.logDebugMessage(String('EditUserDetailsComponent getImageTitle() ')); 
let image_title = id + 'Ω' + formatDate(new Date(),'yyyy.MM.dd HH-mm-ss','en');
return image_title;
}

submitImageForm() {
      let id =  this.tokenService.getDecodedToken().id; 
      let imageTitle = this.getImageTitle(id);
        if(this.imageUploadForm.valid) {
          let formData = new FormData();
          formData.append('fileInput', this.imageService.imageBlob, imageTitle);
          this.userService.saveProfileImage(formData, id, imageTitle);
          this.imageUploadForm.controls['image'].patchValue('');
          this.imageService.setBase64Null();
    } 
}

updateImageProfile(imageName: string) {
this.userService.setActiveProfilePhoto( this.tokenService.getDecodedToken().id, imageName);
}

deleteProfileImage(imageName: string) {
this.userService.deleteProfileImage( this.tokenService.getDecodedToken().id, imageName);
    }

previousImage() {
  let actualImageIndex = this.imageIndex;
  this.imageIndex > 0 ? this.imageIndex = actualImageIndex - 1 : this.imageIndex = actualImageIndex;
    }

nextImage() {
  let actualImageIndex = this.imageIndex;
  this.imageIndex < this.userService.getUser().profilePhotos.length - 1 ? this.imageIndex = actualImageIndex + 1 : this.imageIndex = actualImageIndex;
    }
    
setImageIndex(index: number) {
  this.imageIndex = index
  }    

}
