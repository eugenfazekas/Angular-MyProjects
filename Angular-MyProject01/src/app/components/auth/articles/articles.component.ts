import { Component } from '@angular/core';
import { ArticlesRepository } from 'src/app/repositorys/articles-repository';
import { ArticleModel } from 'src/app/model/article.model';
import { CategoriesRepository } from 'src/app/repositorys/categories-repository';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { TokenService } from 'src/app/shared/user/token.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {

  createArticle: boolean = false;
  categoryFilter: string = 'All Categories';
  authorFilter: string = 'All Authors';
  newArticle: ArticleModel = new ArticleModel();

  constructor(private articleRepository: ArticlesRepository, private categorisRepository: CategoriesRepository, 
              private formBuilder: FormBuilder, private tokenService: TokenService ) { }

  searchForm = this.formBuilder.group({ search: ['',[ Validators.minLength(3) ]]});

  range = this.formBuilder.group({start: new FormControl(), end: new FormControl() });

  createArticleForm = this.formBuilder.group({ 
                  category: ['',[ Validators.minLength(3),Validators.required ]],
                  title: ['',[ Validators.minLength(3),Validators.required ]],
                  content: ['',[ Validators.minLength(3),Validators.required ]]
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

  enableArticle() {
     this.createArticle = true;
  }

  getUserCategories(): string[] {   
    return this.categorisRepository.getCategories().filter(res => res != 'All Categories');
  }

  submitForm() {
    Object.keys(this.createArticleForm.controls) .forEach(c => this.newArticle[c] = this.createArticleForm.controls[c].value);
               this.newArticle.owner = this.tokenService.getDecodedToken().sub;
                if(this.createArticleForm.valid) {
                  this.articleRepository.s
                }
  } 

}
