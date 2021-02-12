import { Injectable, Inject } from '@angular/core';
import { BASE_URL } from '../user/user-rest-data-source.service';
import { TokenService } from '../user/token.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class CategoriesRestDataSourceService {

  private baseURL: string ;
  
  private tokenHeader = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.getToken()}`);
  
  private param(param: string) {
        return new HttpParams().set('category', param)
  }


 

  constructor( private _http: HttpClient, @Inject(BASE_URL) _baseURL: string, private tokenService: TokenService ) {
    this.baseURL = _baseURL;
  }

    addCategory(category: string): Observable<string> { 

      return this._http.post(`${this.baseURL}/categories/addCategory`,{},{'headers': this.tokenHeader, 'params' : this.param(category) , responseType: 'text'})
    }

    deleteCategory(category: string): Observable<string> {
      return this._http.post(`${this.baseURL}/categories/deleteCategory`,{},{'headers': this.tokenHeader, 'params' : this.param(category) , responseType: 'text'});
    }

    getCategories(): Observable<string[]> {
 
      return this._http.get<string[]>(`${this.baseURL}/categories/findCategories`,{ 'headers': this.tokenService.getOptions() });
   }
}

