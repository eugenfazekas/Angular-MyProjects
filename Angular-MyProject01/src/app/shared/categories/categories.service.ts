import { Injectable } from '@angular/core';
import { CategoriesRestDataSourceService } from './categories-rest-data-source.service';

@Injectable()
export class CategoriesService {

  private categories: string[];

  constructor( private categoriesRestDataSourceService: CategoriesRestDataSourceService ) { 
               this.getCategories();   
  }

    addCategory(category: string) {
        
        this.categoriesRestDataSourceService.addCategory(category).subscribe(
          res => this.categories.push(res),
          err => console.log('Error on adding category: ',err)
        )
      }

    deleteCategory(category: string) {
      
      this.categoriesRestDataSourceService.addCategory(category).subscribe(
        res => this.categories.splice(this.categories.findIndex(o => category == o ), 1),
        err => console.log('Error on deleting category: ',err)
         )
      }

    getCategories() {

        this.categoriesRestDataSourceService.getCategories().subscribe(
          res => this.categories = res,
          err => console.log('Error on getting categories: ',err)
        )
        return this.categories;
      }

}
