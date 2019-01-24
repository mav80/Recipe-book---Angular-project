import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Test recipe', 'This is a test', 'https://i.wpimg.pl/O/644x432/d.wpimg.pl/1831575938-1560570594/kotlet-schabowy.jpg'),
    new Recipe('Przepis no. 2', 'CBRka w sosie własnym', 'https://mav.matcom.com.pl/2015-03-CBR1000RRFirebladeFull.jpg')
  ];

  getRecipes() {
    return this.recipes.slice(); // this returns a copy of our array, so we make sure only copy may be changed, not original one in service
  }
}
