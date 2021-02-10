import { Injectable, Inject } from '@angular/core';
import { BASE_URL } from '../user/user-rest-data-source.service';
import { TokenService } from '../user/token.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesRestDataSourceService {

  private baseURL: string ;

  constructor( private _http: HttpClient, @Inject(BASE_URL) _baseURL: string, private tokenService: TokenService ) {
    this.baseURL = _baseURL;
  }
    addCategory(category: string): Observable<string> {
    return this._http.post<string>(`${this.baseURL}/categories/addCategory`, category, { 'headers': this.tokenService.getOptions() });
    }

    deleteCategory(category: string): Observable<string> {
      return this._http.post<string>(`${this.baseURL}/categories/deleteCategory`, category, { 'headers': this.tokenService.getOptions() });
    }

    getCategories(): Observable<string[]> {
      return this._http.get<string[]>(`${this.baseURL}/categories/findCategories`,{ 'headers': this.tokenService.getOptions() });
   }
}