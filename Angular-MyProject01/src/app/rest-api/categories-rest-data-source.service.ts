import { Injectable, Inject } from '@angular/core';
import { BASE_URL } from './user-rest-data-source.service';
import { TokenService } from '../shared/services/token.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogService } from '../shared/services/log.service';



@Injectable()
export class CategoriesRestDataSourceService {

  private baseURL: string ;
  
  private param(param: string) {
        return new HttpParams().set('category', param)
  }

  constructor( private _http: HttpClient, @Inject(BASE_URL) _baseURL: string, private tokenService: TokenService,private logservice: LogService ) {
    this.baseURL = _baseURL;
    this.logservice.logDebugMessage(String('CategoriesRestDataSourceService constructor: ')); 
  }

    addCategory(category: string): Observable<string> { 
      this.logservice.logDebugMessage(String('CategoriesRestDataSourceService addCategory() '));
      return this._http.post(`${this.baseURL}/categories/addCategory`,{},{'headers': this.tokenService.getOptions(), 'params' : this.param(category) , responseType: 'text'})
    }

    deleteCategory(category: string): Observable<string> {
      this.logservice.logDebugMessage(String('CategoriesRestDataSourceService deleteCategory() '));
      return this._http.post(`${this.baseURL}/categories/deleteCategory`,{},{'headers': this.tokenService.getOptions(), 'params' : this.param(category) , responseType: 'text'});
    }

    getCategories(): Observable<string[]> {
      this.logservice.logDebugMessage(String('CategoriesRestDataSourceService getCategories() '));
      return this._http.get<string[]>(`${this.baseURL}/categories/findCategories`,{ 'headers': this.tokenService.getOptions() });
   }
}

