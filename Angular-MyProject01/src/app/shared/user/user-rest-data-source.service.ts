import { Injectable,  Inject, InjectionToken } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../../model/user.model';

export const BASE_URL = new InjectionToken<string>('BaseUrl');

@Injectable()
export class UserRestDataSourceService {

  private baseURL: string ;

  constructor( private _http: HttpClient, @Inject(BASE_URL) _baseURL: string ) {
           this.baseURL = _baseURL
   }

  saveUser(user: UserModel): Observable<UserModel> {
    return this._http.post<UserModel>(`${this.baseURL}/user/registerUser`,user);
  }

  userExistCheck(email: string): Observable<boolean>{

    let param = new HttpParams()
    .set('email', email);
  
    return this._http.post<boolean>(`${this.baseURL}/user/userExistCheck`, param);
  }
}
 
