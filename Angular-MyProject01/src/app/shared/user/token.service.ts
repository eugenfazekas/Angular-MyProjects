import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class TokenService {

  private jwt = new JwtHelperService();
  private auth_token: string;
  constructor() { this.getLocalToken(); }

  getLocalToken() {
    this.auth_token = localStorage.getItem('token') != null ? localStorage.getItem('token') : '';  
    console.log('token', this.auth_token)  
       return ;
   }

   getToken() {
     return this.auth_token;
   }

   setToken(token: string) {
     this.auth_token = token;
   }

  getDecodedToken() {
    let decodedToken = this.jwt.decodeToken(this.auth_token);
        return decodedToken != null ? decodedToken : '' ;
   }

    getOptions() {
console.log('get options', this.auth_token)
    return new HttpHeaders()
         .set('Authorization', `Bearer ${this.auth_token}`);
         }
}
