import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class LoginService {

  baseURL: string = 'http://localhost:4800/user/login'

  constructor(private http : HttpClient) { }

  
  loginUser(user: string, pass: string): Observable<any> {
    
    let params = new HttpParams()
    .set('userName', user)
    .set('password', pass);

console.log(params.toString());
 
   console.log(this.baseURL);
    return this.http.post(this.baseURL, params, {responseType: 'json'});
  }
}
