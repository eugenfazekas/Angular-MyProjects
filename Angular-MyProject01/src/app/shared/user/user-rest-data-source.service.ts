import { Injectable,  Inject, InjectionToken } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../../model/user.model';
import { TokenService } from './token.service';
import { LogService } from '../log.service';

export const BASE_URL = new InjectionToken<string>('BaseUrl');

@Injectable()
export class UserRestDataSourceService {

  private baseURL: string ;

   param1(email: string) { 
     return new HttpParams()
            .set('email', email);
   }

   param2(id: string, imageName: string) { 
    return new HttpParams()
           .set('imageName', imageName)
           .set('id', id);      
  }

  param3(id: string, imageName: string, imageNameActive: string) { 
    return new HttpParams()
          .set('id', id)
           .set('imageName', imageName)
           .set('imageNameActive', imageNameActive);
                 
  }

  constructor(private tokenService: TokenService, private _http: HttpClient, @Inject(BASE_URL) _baseURL: string, private logservice: LogService) {
           this.logservice.logDebugMessage(String('UserRestDataSourceService constructor: '));
           this.baseURL = _baseURL; 
   }

  saveUser(user: UserModel): Observable<UserModel> {
    this.logservice.logDebugMessage(String('UserRestDataSourceService saveUser() '));
    return this._http.post<UserModel>(`${this.baseURL}/user/registerUser`,user);
  }

  getUser(email: string):Observable<UserModel> {
    this.logservice.logDebugMessage(String('UserRestDataSourceService getUser() '));
    return this._http.post<UserModel>(`${this.baseURL}/userDetails/findUserByEmail`,{},{'headers': this.tokenService.getOptions(), 'params' : this.param1(email)});
  }

  userExistCheck(email: string): Observable<boolean>{
    this.logservice.logDebugMessage(String('UserRestDataSourceService userExistCheck() '));
    return this._http.post<boolean>(`${this.baseURL}/user/userExistCheck`, this.param1(email));
  }

  updateUser(user: UserModel): Observable<UserModel> {
    this.logservice.logDebugMessage(String('UserRestDataSourceService updateUser() '));
    return this._http.post<UserModel>(`${this.baseURL}/userDetails/updateUser`, user, {'headers': this.tokenService.getOptions()});
  }

  saveProfileImage(image: FormData): Observable<string> {
    this.logservice.logDebugMessage(String('UserRestDataSourceService saveImage() '));
    return this._http.post(`${this.baseURL}/userDetails/saveProfileImage`,image, {'headers': this.tokenService.getOptions(), responseType: 'text'});
  }

  deleteProfileImage(id: string, imageName: string, imageNameActive: string ): Observable<string> {
    this.logservice.logDebugMessage(String('UserRestDataSourceService saveImage() '));
    return this._http.post(`${this.baseURL}/userDetails/deleteProfileImage`,{},{'headers': this.tokenService.getOptions(), 'params' : this.param3(id, imageName, imageNameActive),responseType: 'text'});
  }

  setActiveProfilePhoto(id: string, imageName: string): Observable<string> {
    this.logservice.logDebugMessage(String('UserRestDataSourceService saveImage() '));
    return this._http.post(`${this.baseURL}/userDetails/setActiveProfilePhoto`,{},{'headers': this.tokenService.getOptions(), 'params' : this.param2(id,imageName), responseType: 'text'});
  }
}
 
