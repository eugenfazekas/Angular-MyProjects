import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from './user-rest-data-source.service';
import { UserModel } from '../../model/user.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {

  private baseURL: string ;
  private helper = new JwtHelperService();

 

  constructor(private _http: HttpClient, @Inject(BASE_URL) _baseURL: string, private tokenService: TokenService) { 
                       this.baseURL = _baseURL;
                  }               
  
  loginUser(user: string, pass: string): Observable<Boolean> {
 
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
