import { Injectable } from '@angular/core';

@Injectable()
export class SignToggleService {

  public loggedIn: boolean = localStorage.getItem('token') != null ? true : false; 

  removeToken() {
    localStorage.removeItem('token');
  }

  setLoggedIn(status: boolean){
    this.loggedIn = status;
  }

}
