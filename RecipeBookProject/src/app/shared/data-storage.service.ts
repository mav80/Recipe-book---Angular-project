import { Injectable } from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.httpClient.put('https://my-recipe-book-mav.firebaseio.com/recipes.json?auth='  + token, this.recipeService.getRecipes());
  }

  getRecipes() {

    const token = this.authService.getToken();

    this.httpClient.get<Recipe[]>('https://my-recipe-book-mav.firebaseio.com/recipes.json?auth=' + token).pipe
    (map((recipes) => {
        for (let recipe of recipes) {
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
