import { Pipe, PipeTransform } from '@angular/core';
import { ArticleModel } from 'src/app/model/article.model';

@Pipe({
  name: 'nxPublishedDateFilterPipe',
  pure: false
})
export class NxPublishedDateFilterPipe implements PipeTransform {

  transform(articles: ArticleModel[], owner: string): ArticleModel[] {
    return owner == 'All Authors' ? articles : articles.filter(p => p.owner == owner);
   
}

}
