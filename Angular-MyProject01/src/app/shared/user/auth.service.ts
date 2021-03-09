import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BASE_URL } from './user-rest-data-source.service';
import { UserModel } from '../../model/user.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './token.service';
import { LogService } from '../log.service';

@Injectable()
export class AuthService {

  private baseURL: string ;
  private helper = new JwtHelperService();

 

  constructor(private _http: HttpClient, @Inject(BASE_URL) _baseURL: string, private tokenService: TokenService, private logservice: LogService) { 
                       this.baseURL = _baseURL;
                       this.logservice.logDebugMessage(String('AuthService constructor: '));
                  }               
  
  loginUser(user: string, pass: string): Observable<Boolean> {
    this.logservice.logDebugMessage(String('AuthService loginUser() '));
    return this._http.post(`${this.baseURL}/authenticate`, { "username" : user, "password" : pass }).pipe(

              map( (response: any) => {

                      this.tokenService.setToken(response.jwt);
                      const decodedToken = this.helper.decodeToken(response.jwt);
                      localStorage.setItem('token',response.jwt);
                           return true;
                  }
                )
            );
  }
  
}
