import { Component, OnInit } from '@angular/core';
import { ArticlesRepository } from 'src/app/repositorys/articles-repository';
import { ArticleModel } from 'src/app/model/article.model';
import { CategoriesRepository } from 'src/app/repositorys/categories-repository';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {

  categoryFilter: string = 'All Categories';
  authorFilter: string = 'All Authors';

  constructor(private articleRepository: ArticlesRepository, private categorisRepository: CategoriesRepository, private formBuilder: FormBuilder) { }

  searchForm = this.formBuilder.group({ search: ['',[ Validators.minLength(3) ]]});

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  getArticles(): ArticleModel[] {
    return this.articleRepository.getArticles();
  }

  getCategories(): string[] {
    return this.categorisRepository.getCategories();
  }

  getAuthors(): Set<string> {
    return this.articleRepository.getArticleAuthors();
  }

}
