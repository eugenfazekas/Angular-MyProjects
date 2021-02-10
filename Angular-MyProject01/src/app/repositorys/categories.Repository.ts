import { Injectable } from '@angular/core';
import { CategoriesRestDataSourceService } from '../shared/categories/categories-rest-data-source.service';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesRepository {

  private categories: string[] = [];

  constructor( private categoriesRestDataSourceService: CategoriesRestDataSourceService ) {   
        categoriesRestDataSourceService.getCategories().subscribe(
          res => this.categories = res,
          err => console.log('Error on getting categories: ',err)
        )
  }

    addCategory(category: string) {
        
        this.categoriesRestDataSourceService.addCategory(category).subscribe(
          res => this.categories.push(res),
          err => console.log('Error on adding category: ',err)
        )
      }

    deleteCategory(category: string) {
      
      this.categoriesRestDataSourceService.deleteCategory(category).subscribe(
        res => this.categories.splice(this.categories.findIndex(o => category == o ), 1),
        err => console.log('Error on deleting category: ',err)
         )
      }

   getCategories(): Observable<string[]> {

      return this.categoriesRestDataSourceService.getCategories();
    }

}
