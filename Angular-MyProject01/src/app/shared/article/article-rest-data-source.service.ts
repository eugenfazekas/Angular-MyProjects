import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
     console.log('Article token get options',this.getOptions())

    return this._http.get<ArticleModel[]>(`${this.baseURL}/article/findAllArticles`,this.getOptions())
   }

   saveArticle(article: ArticleModel): Observable<ArticleModel> {
    return this._http.post<ArticleModel>(`${this.baseURL}/article/saveArticle`,article, this.getOptions());
  }
 
    private getOptions() {
      return {
          headers: new HttpHeaders({
              "Authorization": `Bearer ${this.tokenService.getToken()}`
          })
      }
  }
}