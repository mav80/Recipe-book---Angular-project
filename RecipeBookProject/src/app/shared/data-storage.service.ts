import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http, private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put('https://my-recipe-book-mav.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get('https://my-recipe-book-mav.firebaseio.com/recipes.json').pipe
    (map((response: Response) => {
        const recipes: Recipe[] = response.json();
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    )).subscribe(
      (recipes: Recipe[]) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);

      }
    );
  }

}
