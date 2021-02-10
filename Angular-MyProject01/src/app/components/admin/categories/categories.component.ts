import { Component } from '@angular/core';
import { CategoriesRepository } from 'src/app/repositorys/categories.Repository';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  private categories: string[] = []; 

  constructor(private categoriesRepository: CategoriesRepository, private formBuilder: FormBuilder) {
     this.categoriesRepository.getCategories().subscribe(
       res => this.categories = res,
       err => console.log('Categories Component error gettin categories ',err)
     );
  }
  
  getCategories(): string[] {
    return this.categories;
  }

  categoryForm = this.formBuilder.group({ category: [''] });
  
  onSubmit() {
    console.log(this.categories) 
  
  };
}
