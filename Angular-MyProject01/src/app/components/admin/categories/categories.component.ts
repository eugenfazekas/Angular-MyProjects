import { Component } from '@angular/core';
import { CategoriesRepository } from 'src/app/repositorys/categories-repository';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  constructor(private categoriesRepository: CategoriesRepository, private formBuilder: FormBuilder) {}
  
  getCategories(): string[] {
    return this.categoriesRepository.getCategories();
  }

  categoryForm = this.formBuilder.group({ category: ['',[Validators.required, Validators.minLength(3) ]]});
  
  onSubmit() {
    if(this.categoryForm.valid){
      this.categoriesRepository.addCategory(this.categoryForm.controls['category'].value)
    }
  };

  deleteCategory(item: string) {
    this.categoriesRepository.deleteCategory(item);
  }
}
