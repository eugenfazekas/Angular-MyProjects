import { Injectable,  Inject, InjectionToken } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';
import { BASE_URL } from '../app-routing.module';

@Injectable()
export class UserRestDataSourceService {
 
  private user: UserModel;
  private baseURL: string ;
  constructor( private _http: HttpClient, @Inject(BASE_URL) _baseURL: string ) {
    this.baseURL = _baseURL
   }

  getUsers(): Observable<UserModel[]>{
    return this._http.get<UserModel[]>(`${this.baseURL}/user/getUsers`);
  }

  loginUser(user: string, pass: string): Observable<any> {
    
    let params = new HttpParams()
    .set('userName', user)
    .set('password', pass);

    return this._http.post(`${this.baseURL}/user/login`, params, {responseType: 'text'});
  }

  saveUser(user: UserModel): Observable<UserModel> {
    return this._http.post<UserModel>(`${this.baseURL}/user/registerUser`,user);
  }

}

