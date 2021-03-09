import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { LogService } from '../log.service';


@Injectable()
export class SignButtonToggleService {

  constructor(private tokenService: TokenService,private logservice: LogService) {
    this.logservice.logDebugMessage(String('SignButtonToggleService constructor: '));
    this.token = tokenService.getDecodedToken();
     this.name = this.token ? `Welcome ${this.token.fullName}` : '';
  }

  private token;
  public name; 
  public loggedIn: boolean = localStorage.getItem('token') != null ? true : false; 

  setFullname() {
    this.logservice.logDebugMessage(String('SignButtonToggleService setFullname() '));
    this.token = this.tokenService.getDecodedToken();
    this.name = `Welcome ${this.token.fullName}`;
    this.tokenService.adminVerify();
  }

  removeToken() {
    this.logservice.logDebugMessage(String('SignButtonToggleService removeToken() '));
    localStorage.removeItem('token');
    this.tokenService.setToken('');
  }

  setLoggedIn(status: boolean){
    this.logservice.logDebugMessage(String('SignButtonToggleService setLoggedIn() '));
    this.loggedIn = status;
  }
  
}
