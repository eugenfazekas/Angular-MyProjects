import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/categories/categories.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  private categories: string[] = this.categoriesService.getCategories();

  constructor(private categoriesService: CategoriesService, private formBuilder: FormBuilder) { }

  categoryForm = this.formBuilder.group({ category: [''] });
  
  onSubmit() {

    console.log(this.categoryForm.controls['category'].value)
  };
}
