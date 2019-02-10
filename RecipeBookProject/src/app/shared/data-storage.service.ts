import { Injectable } from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) { }

  storeRecipes() {
    // const token = this.authService.getToken();
    // return this.httpClient.put('https://my-recipe-book-mav.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), {
    //   params: new HttpParams().set('auth', token)
    //   });

    // observe progress of file upload

    const req = new HttpRequest('PUT', 'https://my-recipe-book-mav.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {reportProgress: true} );

    return this.httpClient.request(req);
  }

  getRecipes() {

    // const token = this.authService.getToken();

    // this.httpClient.get<Recipe[]>('https://my-recipe-book-mav.firebaseio.com/recipes.json?auth=' + token).pipe //original method working fine, the one below is for testing

    this.httpClient.get<Recipe[]>('https://my-recipe-book-mav.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    }).pipe
    (map((recipes) => {
      // console.log(recipes);
      // return recipes;
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
