import { Injectable } from '@angular/core';
import { ArticleRestDataSourceService } from '../shared/article/article-rest-data-source.service';
import { ArticleModel } from '../model/article.model';


@Injectable()
export class ArticlesRepository {

  private articles: ArticleModel[] = [];
  private articleAuthors: Set<string> = new Set<string>();

  constructor(private articleRestDataSource: ArticleRestDataSourceService) { 
    this.articleAuthors.add('All Authors');
          articleRestDataSource.getArticles().subscribe(
            res => {     
                let array = res;
                this.articles = array;
                for (let model of array) 
                this.articleAuthors.add(model.owner);      
                   },
            err => console.log('Error on getting Articles',err)
          );
  }

  getArticles(): ArticleModel[] {
    return this.articles;
  }

  getArticleAuthors(): Set<string> {
    return this.articleAuthors;
  }
  
  saveArticle(article: ArticleModel, image?: FormData) {
    this.articleRestDataSource.saveArticle(article).subscribe(
      res => this.articles.push(res),
      err => console.log(err)
    );
  }

  saveImage(image?: FormData) {
    this.articleRestDataSource.saveImage(image).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  deleteArticle(articleId: string){
    this.articleRestDataSource.deleteArticle(articleId).subscribe(
      res => this.articles.splice(this.articles.findIndex(o => articleId == o.id ), 1),
    )
  }
}
