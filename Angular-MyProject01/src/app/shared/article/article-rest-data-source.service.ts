import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../user/user-rest-data-source.service';
import { ArticleModel } from 'src/app/model/article.model';
import { Observable } from 'rxjs';
import { TokenService } from '../user/token.service';
import { LogService } from '../log.service';

@Injectable()
export class ArticleRestDataSourceService {

  private baseURL: string ;
  
  private param(param: string) {
        return new HttpParams().set('articleId', param)
  }

  constructor( private _http: HttpClient, @Inject(BASE_URL) _baseURL: string, private tokenService: TokenService,private logservice: LogService ) {
           this.baseURL = _baseURL;
           this.logservice.logDebugMessage(String('ArticleRestDataSourceService constructor: ')); 
   }

   getArticles(): Observable<ArticleModel[]> {
    this.logservice.logDebugMessage(String('ArticleRestDataSourceService getArticles() '));
    return this._http.get<ArticleModel[]>(`${this.baseURL}/article/findAllArticles`,{'headers': this.tokenService.getOptions()})
   }
   
   saveArticle(article: ArticleModel): Observable<ArticleModel> {
    this.logservice.logDebugMessage(String('ArticleRestDataSourceService saveArticle() '));
    return this._http.post<ArticleModel>(`${this.baseURL}/article/saveArticle`,article, {'headers': this.tokenService.getOptions()});
  }

   saveImage(image: FormData): Observable<string> {
    this.logservice.logDebugMessage(String('ArticleRestDataSourceService saveImage() '));
    return this._http.post(`${this.baseURL}/article/saveImage`,image, {'headers': this.tokenService.getOptions(), responseType: 'text'});
  }

   deleteArticle(articleId: string):Observable<string> {
    this.logservice.logDebugMessage(String('ArticleRestDataSourceService deleteArticle() '));
     return this._http.post(`${this.baseURL}/admin/deleteArticle`,{},{'headers': this.tokenService.getOptions(), 'params' : this.param(articleId) , responseType: 'text'})
   }
}