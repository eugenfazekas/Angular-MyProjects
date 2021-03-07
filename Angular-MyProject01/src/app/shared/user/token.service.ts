import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TokenService {

  private jwt = new JwtHelperService();
  private auth_token: string;
  private subject = new Subject<any>();
  
  constructor() { this.getLocalToken() }

  getLocalToken() {
    this.auth_token = localStorage.getItem('token') != null ? localStorage.getItem('token') : '';   
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

   getFullname() {
    let decodedToken = this.jwt.decodeToken(this.auth_token);
    return decodedToken != null ? decodedToken.fullName : '' ;
   }

   getEmail() {
    let decodedToken = this.jwt.decodeToken(this.auth_token);
    return decodedToken != null ? decodedToken.sub : '' ;
   }

  getOptions() {
    return new HttpHeaders()
         .set('Authorization', `Bearer ${this.auth_token}`)
         }

  getAdmin(): boolean {
      let check = false;
      if(this.getDecodedToken().authorities != undefined) {
        let authorities = this.getDecodedToken().authorities;
        for(let auth of authorities){
          auth.authority == 'admin' ?  check = true : null;
                }
       }
       return check;
  }       

  getAdminObs() :Observable<any> {
    return this.subject.asObservable();
  }    
        
  adminVerify() {
    if(this.getDecodedToken().authorities != undefined) {
    let authorities = this.getDecodedToken().authorities;
    for(let auth of authorities){
      auth.authority == 'admin' ?  this.subject.next(true) : null;
            }
          }
      }   
}


