import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from './user-rest-data-source.service';
import { UserModel } from '../model/user.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  private baseURL: string ;
  private helper = new JwtHelperService();
  public auth_token: string ;
 

  constructor(private _http: HttpClient, @Inject(BASE_URL) _baseURL: string) { 
                       this.baseURL = _baseURL;
                  }               
  
  loginUser(user: string, pass: string): Observable<Boolean> {
 
    return this._http.post(`${this.baseURL}/authenticate`, { "username" : user, "password" : pass }).pipe(

              map( (response: any) => {

                      this.auth_token = response.jwt ? response.jwt : null;
                      const decodedToken = this.helper.decodeToken(response.jwt);
                      localStorage.setItem('token',response.jwt);
                           return true;
                  }
                )
            );
  }
  private getOptions() {
    return {
        headers: new HttpHeaders({
            "Authorization": `Bearer<${this.auth_token}>`
        })
    }
}
}
