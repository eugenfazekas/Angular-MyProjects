import { Component } from '@angular/core';
import { ArticlesRepository } from 'src/app/repositorys/articles-repository';
import { ArticleModel } from 'src/app/model/article.model';
import { CategoriesRepository } from 'src/app/repositorys/categories-repository';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { TokenService } from 'src/app/shared/user/token.service';
import { formatDate } from '@angular/common';
import * as EventEmitter from 'events';

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
  accept:string[] = ['.jpg','.png','.jpeg'];
  multiple:boolean = false;
  base64;
  imagePath;
  constructor(private articleRepository: ArticlesRepository, private categorisRepository: CategoriesRepository, 
              private formBuilder: FormBuilder, private tokenService: TokenService) { }

  searchForm = this.formBuilder.group({ search: ['',[ Validators.minLength(3) ]]});

  range = this.formBuilder.group({start: new FormControl(), end: new FormControl() });

  createArticleForm = this.formBuilder.group({ 
                  category: ['',[ Validators.minLength(3),Validators.required ]],
                  title: ['',[ Validators.minLength(3),Validators.required ]],
                  content: ['',[ Validators.minLength(5),Validators.required ]],
                  image: ['',[Validators.pattern('[^Ω]+')]]
                                          });                          
  onChange(event) {

    let item = this.createArticleForm.controls['image'].value;
    console.log(item)
    this.fileReader(item).then(res => this.compressImage(res,500).then(res => {this.base64 = this.b64toBlob(res); this.imagePath = res}))
  }

  fileReader(item) {
    return new Promise( (res)  => {
            let reader = new FileReader();
            reader.readAsDataURL(item);
            reader.onload = ( (data) => {
                     res(data.target.result);
            }
         )   
       }
    )
  }

 compressImage(src,width) {
      return new Promise((res, rej) => {
        const img = new Image();
        img.src = src;
        img.onload = (event) => {
          const elem = document.createElement('canvas');
          const loadedImage: any = event.currentTarget;
          elem.width = width;
          elem.height = (loadedImage.width / loadedImage.height > 0 ? ( width / ( loadedImage.width / loadedImage.height )) : (width / (loadedImage.height / loadedImage.width)));
          const ctx = elem.getContext('2d');
          ctx.drawImage(img, 0, 0, elem.width, elem.height);
          const data = ctx.canvas.toDataURL();
          res(data);
        }
        img.onerror = error => rej(error);
      })
    }

  b64toBlob(dataURI) {     
        let byteString = atob(dataURI.split(',')[1]);
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
    
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/png' });
    } 

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

  getImageTitle(name: string): string { 
    let image_title = name + 'Ω' + formatDate(new Date(),'yyyy.MM.dd HH-mm-ss','en');
    return image_title;
  }

  submitForm() {

    Object.keys(this.createArticleForm.controls).forEach(c => c != 'image' ?
                this.newArticle[c] = this.createArticleForm.controls[c].value : null);
                let id =  this.tokenService.getDecodedToken().id;  
                this.newArticle.owner = this.tokenService.getDecodedToken().fullName; 
                if(this.createArticleForm.valid) {
                      this.newArticle.image_title = this.createArticleForm.controls['image'].value != '' ? this.getImageTitle(id): null;
                      this.articleRepository.saveArticle(this.newArticle);
                        if(this.createArticleForm.controls['image'].value) {
                          let formData = new FormData();
                          formData.append('fileInput', this.base64, this.getImageTitle(id));
                          this.articleRepository.saveImage(formData);
                      }
                      this.createArticle = false;
                      window.location.reload();
                }
  }

  userId(title: string): string {

   let id = title.substring(0,title.length-20)
    return id;
  }
  
}

