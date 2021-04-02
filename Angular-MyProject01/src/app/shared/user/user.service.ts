import { Injectable, InjectionToken } from '@angular/core';
import { UserRestDataSourceService } from './user-rest-data-source.service';
import { UserModel } from '../../model/user.model';
import { Observable, from, of } from 'rxjs';
import { LogService } from '../log.service';
import { TokenService } from './token.service';
import { ImageService } from '../image.service';

@Injectable()
export class UserService {

  private user: UserModel = new UserModel();

  constructor(private userRestDataSource: UserRestDataSourceService, private tokenService: TokenService,
    private imageService: ImageService, private logservice: LogService) {
    this.logservice.logDebugMessage(String('UserService constructor: '));
    this.userRestDataSource.getUser(this.tokenService.getEmail()).subscribe(
      res => { 
              this.user = res;
              this.user.profilePhotos == null ? this.user.profilePhotos = [] : this.user.profilePhotos = res.profilePhotos;
            },
      err => console.log(err)
    )
   }

/*
 async saveUser(user: UserModel) {
    let result = await this.userRestDataSource.saveUser(user).toPromise()
      return result;
  }
  */

  saveUser(user: UserModel): Observable<UserModel> {
    this.logservice.logDebugMessage(String('UserService saveUser() '));
      return this.userRestDataSource.saveUser(user);
  }

  getUser():UserModel { 
    this.logservice.logDebugMessage(String('UserService getUser() '));
      return this.user;
  }

  updateUser(userModel: UserModel) { 
    this.logservice.logDebugMessage(String('UserService updateUser() '));
    this.userRestDataSource.updateUser(userModel).subscribe(
      res => this.user = res,
      err => console.log(err)   
    );
  }

  saveProfileImage(image?: FormData, id?: string, imageName?: string) {
    this.logservice.logDebugMessage(String('UserService saveImage() '));
    this.userRestDataSource.saveProfileImage(image).subscribe(
          res => { 
            this.user.profilePhotos.push(imageName);
            this.user.activeProfilePhoto == null || this.user.activeProfilePhoto == "" ? this.setActiveProfilePhoto(id, imageName) : null;
          },
            err => console.log(err) 
          );
     }

  deleteProfileImage(id: string, imageName: string) {
    let activeProfile =  this.user.activeProfilePhoto;
    let imageNameActive = imageName  == this.user.activeProfilePhoto ? 'true' : 'false';
    this.logservice.logDebugMessage(String('UserService deleteImage() '))
    this.userRestDataSource.deleteProfileImage(id, imageName, imageNameActive).subscribe(
          res => { 
            imageName == this.user.activeProfilePhoto ? this.user.activeProfilePhoto = null : activeProfile ;
            this.user.profilePhotos.splice(this.user.profilePhotos.findIndex(o => imageName == o), 1) 
          },
          err => console.log(err)
    );
  }

  setActiveProfilePhoto(id: string, imageName: string) {
    this.logservice.logDebugMessage(String('UserService setActiveProfilePhoto() '));
    this.userRestDataSource.setActiveProfilePhoto(id, imageName).subscribe(
              res => this.user.activeProfilePhoto = res,
              err => console.log(err)   
              );  
          }

   getProfilePhoto(): string {
      let profilePhoto = ( this.user.activeProfilePhoto != null && this.user.activeProfilePhoto != "" ) ? this.imageService._url +'/user/'+ this.user.id+'/' + this.user.activeProfilePhoto + '.png' :
      this.imageService._url + '/user/image/profile_placeholder.png';
        return profilePhoto;
   } 

}

