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

  private tokenHeader = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.getToken()}`);

   param(email: string) { 
     return new HttpParams()
            .set('email', email);
   }
  constructor( private _http: HttpClient, @Inject(BASE_URL) _baseURL: string, private tokenService: TokenService, private logservice: LogService) {
           this.baseURL = _baseURL;
           this.logservice.logDebugMessage(String('UserRestDataSourceService constructor: '));
   }

  saveUser(user: UserModel): Observable<UserModel> {
    this.logservice.logDebugMessage(String('UserRestDataSourceService saveUser() '));
    return this._http.post<UserModel>(`${this.baseURL}/user/registerUser`,user);
  }

  getUser(email: string):Observable<UserModel> {
    this.logservice.logDebugMessage(String('UserRestDataSourceService getUser() '));
    return this._http.post<UserModel>(`${this.baseURL}/userDetails/findUserByEmail`,{},{'headers': this.tokenHeader, 'params' : this.param(email)});
  }

  userExistCheck(email: string): Observable<boolean>{
    this.logservice.logDebugMessage(String('UserRestDataSourceService userExistCheck() '));
    return this._http.post<boolean>(`${this.baseURL}/user/userExistCheck`, this.param(email));
  }

  updateUser(user: UserModel): Observable<UserModel> {
    this.logservice.logDebugMessage(String('UserRestDataSourceService updateUser() '));
    return this._http.post<UserModel>(`${this.baseURL}/userDetails/updateUser`, user, {'headers': this.tokenHeader});
  }
}
 
