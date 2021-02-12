import { Injectable } from '@angular/core';
import { ArticleRestDataSourceService } from '../shared/article/article-rest-data-source.service';
import { ArticleModel } from '../model/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesRepository {

  articles: ArticleModel[] = [];

  constructor(private articleRestDataSource: ArticleRestDataSourceService) { 
          articleRestDataSource.getArticles().subscribe(
            res => this.articles = res,
            err => console.log('Error on getting Articles',err)
          )
  }

  getArticles(): ArticleModel[] {

    return this.articles;
  }
}
