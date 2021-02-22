import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../user/user-rest-data-source.service';
import { ArticleModel } from 'src/app/model/article.model';
import { Observable } from 'rxjs';
import { TokenService } from '../user/token.service';

@Injectable()
export class ArticleRestDataSourceService {

  private baseURL: string ;

  private tokenHeader = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.getToken()}`);
  
  private param(param: string) {
        return new HttpParams().set('articleId', param)
  }

  constructor( private _http: HttpClient, @Inject(BASE_URL) _baseURL: string, private tokenService: TokenService ) {
           this.baseURL = _baseURL;
   }

   getArticles(): Observable<ArticleModel[]> {
    return this._http.get<ArticleModel[]>(`${this.baseURL}/article/findAllArticles`,{'headers': this.tokenHeader})
   }
   
   saveArticle(article: ArticleModel): Observable<ArticleModel> {
    return this._http.post<ArticleModel>(`${this.baseURL}/article/saveArticle`,article, {'headers': this.tokenHeader});
  }

   saveImage(image: FormData): Observable<string> {
    return this._http.post(`${this.baseURL}/article/saveImage`,image, {'headers': this.tokenHeader, responseType: 'text'});
  }

   deleteArticle(articleId: string):Observable<string> {
     return this._http.post(`${this.baseURL}/admin/deleteArticle`,{},{'headers': this.tokenHeader, 'params' : this.param(articleId) , responseType: 'text'})
   }
}