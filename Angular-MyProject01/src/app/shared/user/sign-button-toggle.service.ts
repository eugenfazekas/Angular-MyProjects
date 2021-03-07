import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';


@Injectable()
export class SignButtonToggleService {

  constructor(private tokenService: TokenService) {
    this.token = tokenService.getDecodedToken();
     this.name = this.token ? `Welcome ${this.token.fullName}` : '';
  }

  private token;
  public name; 
  public loggedIn: boolean = localStorage.getItem('token') != null ? true : false; 

  setFullname() {
    this.token = this.tokenService.getDecodedToken();
    this.name = `Welcome ${this.token.fullName}`;
    this.tokenService.adminVerify();
  }

  removeToken() {
    localStorage.removeItem('token');
    this.tokenService.setToken('');
  }

  setLoggedIn(status: boolean){
    this.loggedIn = status;
  }
  
}
