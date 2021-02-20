import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../user/user-rest-data-source.service';
import { ArticleModel } from 'src/app/model/article.model';
import { Observable } from 'rxjs';
import { TokenService } from '../user/token.service';

@Injectable()
export class ArticleRestDataSourceService {

  private baseURL: string ;

  constructor( private _http: HttpClient, @Inject(BASE_URL) _baseURL: string, private tokenService: TokenService ) {
           this.baseURL = _baseURL;
   }

   getArticles(): Observable<ArticleModel[]> {
    return this._http.get<ArticleModel[]>(`${this.baseURL}/article/findAllArticles`,this.getOptions())
   }
   

   saveArticle(article: ArticleModel): Observable<ArticleModel> {
    return this._http.post<ArticleModel>(`${this.baseURL}/article/saveArticle`,article, this.getOptions());
  }


  saveImage(image: FormData): Observable<any> {
    return this._http.post(`${this.baseURL}/article/saveImage`,image, this.getOptions());
  }

    private getOptions() {
      return {
          headers: new HttpHeaders({
              "Authorization": `Bearer ${this.tokenService.getToken()}`
          })
      }
  }
}