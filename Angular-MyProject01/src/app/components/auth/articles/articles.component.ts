import { Component, Inject, OnInit } from '@angular/core';
import { ArticlesRepository } from 'src/app/repositorys/articles-repository';
import { ArticleModel } from 'src/app/model/article.model';
import { CategoriesRepository } from 'src/app/repositorys/categories-repository';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { TokenService } from 'src/app/shared/user/token.service';
import { formatDate } from '@angular/common';
import * as EventEmitter from 'events';
import { BASE_URL } from 'src/app/shared/user/user-rest-data-source.service';
import { LogService } from 'src/app/shared/log.service';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  createArticle: boolean = false;
  categoryFilter: string = 'All Categories';
  authorFilter: string = 'All Authors';
  newArticle: ArticleModel = new ArticleModel();
  accept: string[] = ['.jpg','.png','.jpeg'];
  multiple:boolean = false;
  admincheck: boolean = false;
  articlesPerPage = 5;
  selectedPage = 1;
  pages: Set<number> = new Set<number>();
  articlesLength: number ;

  constructor(private articleRepository: ArticlesRepository, private categorisRepository: CategoriesRepository, 
              private formBuilder: FormBuilder, private tokenService: TokenService,
               private logservice: LogService, public imageService: ImageService) {
                    this.logservice.logDebugMessage(String('ArticlesComponent constructor: '));
               }

  ngOnInit() {
      this.adminVerify();
  }

  searchForm = this.formBuilder.group({ search: ['',[ Validators.minLength(3) ]]});
  range = this.formBuilder.group({start: new FormControl(), end: new FormControl() });

  
  createArticleForm = this.formBuilder.group({ 
                  category: ['',[ Validators.minLength(3),Validators.required ]],
                  title: ['',[ Validators.minLength(3),Validators.required ]],
                  content: ['',[ Validators.minLength(5),Validators.required ]],
                  image: ['',[Validators.pattern('[^Ω]+')]]
                                          });                          
  onChange(event) {
    this.logservice.logDebugMessage(String('ArticlesComponent onChange() '));
    let item = this.createArticleForm.controls['image'].value;
    this.imageService.inputService(item);
  }

  getArticles(): ArticleModel[] {
    this.logservice.logDebugMessage(String('ArticlesComponent getArticles() '));
    return this.articleRepository.getArticles();
  }

  getCategories(): string[] {
    this.logservice.logDebugMessage(String('ArticlesComponent getCategories() '));
    return this.categorisRepository.getCategories();
  }

  getAuthors(): Set<string> {
    this.logservice.logDebugMessage(String('ArticlesComponent getAuthors() '));
    return this.articleRepository.getArticleAuthors();
  }

  enableArticle() {
    this.logservice.logDebugMessage(String('ArticlesComponent enableArticle() '));
     this.createArticle = true;
  }

  getUserCategories(): string[] {  
    this.logservice.logDebugMessage(String('ArticlesComponent getUserCategories() ')); 
    return this.categorisRepository.getCategories().filter(res => res != 'All Categories');
  }

  getImageTitle(name: string): string {
    this.logservice.logDebugMessage(String('ArticlesComponent getImageTitle() ')); 
    let image_title = name + 'Ω' + formatDate(new Date(),'yyyy.MM.dd HH-mm-ss','en');
    return image_title;
  }

  submitForm() {

    Object.keys(this.createArticleForm.controls).forEach(c => c != 'image' ?
                this.newArticle[c] = this.createArticleForm.controls[c].value : null);
                let id =  this.tokenService.getDecodedToken().id;  
                this.newArticle.owner = this.tokenService.getDecodedToken().fullName; 
                if(this.createArticleForm.valid) {
                  this.logservice.logDebugMessage(String('ArticlesComponent submitForm() '));
                      this.newArticle.image_title = this.createArticleForm.controls['image'].value != '' ? this.getImageTitle(id): null;
                      this.articleRepository.saveArticle(this.newArticle);
                        if(this.createArticleForm.controls['image'].value) {
                          let formData = new FormData();
                          formData.append('fileInput', this.imageService.imageBlob, this.getImageTitle(id));
                          this.articleRepository.saveImage(formData);
                      }
                      this.createArticle = false;
                      window.location.reload();
                }
  }

  userId(title: string): string {
    this.logservice.logDebugMessage(String('ArticlesComponent userId() '));
   let id: string[] = title.split("Ω")
     return id[0];
  }

  deleteArticle(articleId: string) {
    this.logservice.logDebugMessage(String('ArticlesComponent deleteArticle() '));
    this.articleRepository.deleteArticle(articleId);
  }
  
  adminVerify() {
    this.logservice.logDebugMessage(String('ArticlesComponent adminVerify() '));
     this.admincheck = this.tokenService.getAdmin();
    }
  
  actualPage(page: number) {
    this.selectedPage = page;
  }

  pageCalculator() {
    this.pages.clear();
    let artLength = 0;
    let i = 1;
    while(artLength < this.articlesLength) {
      artLength += this.articlesPerPage;
      this.pages.add(i);
      i++;
    }
  }

  setArticlesLength(length: number) {
     this.pageCalculator();
      this.articlesLength = length;
  }

  nextPage() {
    let page = this.selectedPage;
    if(this.pages.has(page + 1)){
      this.selectedPage = this.selectedPage + 1;
    }
  }

  prevoiusPage() {
    let page = this.selectedPage;
    if(this.pages.has(page - 1)){
      this.selectedPage = this.selectedPage - 1;
    }
  }
}

