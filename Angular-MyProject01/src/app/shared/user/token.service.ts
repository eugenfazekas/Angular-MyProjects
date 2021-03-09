import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LogService } from '../log.service';

@Injectable()
export class TokenService {

  private jwt = new JwtHelperService();
  private auth_token: string;
  private subject = new Subject<any>();
  
  constructor( private logservice: LogService ) { 
    this.logservice.logDebugMessage(String('TokenService constructor: '));
    this.getLocalToken();
   }

  getLocalToken() {
    this.logservice.logDebugMessage(String('TokenService getLocalToken()'));
    this.auth_token = localStorage.getItem('token') != null ? localStorage.getItem('token') : '';   
       return ;
   }

   getToken() {
    this.logservice.logDebugMessage(String('TokenService getToken()'));
     return this.auth_token;
   }

   setToken(token: string) {
    this.logservice.logDebugMessage(String('TokenService setToken()'));
     this.auth_token = token;
   }

  getDecodedToken() {
    this.logservice.logDebugMessage(String('TokenService getDecodedToken()'));
    let decodedToken = this.jwt.decodeToken(this.auth_token);
        return decodedToken != null ? decodedToken : '' ;
   }

   getFullname() {
    this.logservice.logDebugMessage(String('TokenService getFullname()'));
    let decodedToken = this.jwt.decodeToken(this.auth_token);
    return decodedToken != null ? decodedToken.fullName : '' ;
   }

   getEmail() {
    this.logservice.logDebugMessage(String('TokenService getEmail()'));
    let decodedToken = this.jwt.decodeToken(this.auth_token);
    return decodedToken != null ? decodedToken.sub : '' ;
   }

  getOptions() {
    this.logservice.logDebugMessage(String('TokenService getOptions()'));
    return new HttpHeaders()
         .set('Authorization', `Bearer ${this.auth_token}`)
         }

  getAdmin(): boolean {
    this.logservice.logDebugMessage(String('TokenService getAdmin()'));
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
    this.logservice.logDebugMessage(String('TokenService getAdminObs()'));
    return this.subject.asObservable();
  }    
        
  adminVerify() {
    this.logservice.logDebugMessage(String('TokenService adminVerify()'));
    if(this.getDecodedToken().authorities != undefined) {
    let authorities = this.getDecodedToken().authorities;
    for(let auth of authorities){
      auth.authority == 'admin' ?  this.subject.next(true) : null;
            }
          }
      }   
}


