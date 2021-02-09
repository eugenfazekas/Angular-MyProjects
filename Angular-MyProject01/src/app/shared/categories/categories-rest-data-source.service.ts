import { Injectable, Inject } from '@angular/core';
import { BASE_URL } from '../user/user-rest-data-source.service';
import { TokenService } from '../user/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesRestDataSourceService {

  private baseURL: string ;

  constructor( private _http: HttpClient, @Inject(BASE_URL) _baseURL: string, private tokenService: TokenService ) {
    this.baseURL = _baseURL;
    console.log(' categories BearerTOken',`Bearer ${this.tokenService.getToken()}`)
}

    addCategory(category: string): Observable<string> {
    return this._http.post<string>(`${this.baseURL}/categories/addCategory`, category, this.getOptions());
    }

    deleteCategory(category: string): Observable<string> {
      return this._http.post<string>(`${this.baseURL}/categories/deleteCategory`, category, this.getOptions());
      }

    getCategories(): Observable<string[]> {
      return this._http.get<string[]>(`${this.baseURL}/categories/findCategories`, this.getOptions());
      }

    private getOptions() {

        return { headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.tokenService.getToken()}`)
  
      }
    }
}