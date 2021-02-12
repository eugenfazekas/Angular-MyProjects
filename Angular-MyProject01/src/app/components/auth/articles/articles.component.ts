import { Component, OnInit } from '@angular/core';
import { ArticlesRepository } from 'src/app/repositorys/articles-repository';
import { ArticleModel } from 'src/app/model/article.model';
import { CategoriesRepository } from 'src/app/repositorys/categories-repository';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {

 selected = 'option2';
  categoryFilter: string = 'All Categories';

  constructor(private articleRepository: ArticlesRepository,private categorisRepository: CategoriesRepository) { }

  getArticles(): ArticleModel[] {

    return this.articleRepository.getArticles();
  }

  getCategories(): string[] {
    return this.categorisRepository.getCategories();
  }

}
