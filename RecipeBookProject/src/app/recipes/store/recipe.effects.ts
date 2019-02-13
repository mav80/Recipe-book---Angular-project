import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import {map} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES))
    .switchMap((action: RecipeActions.FetchRecipes) => {
      
      return this.httpClient.get<Recipe[]>('https://my-recipe-book-mav.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json'
      }).pipe
      (map((recipes) => {
          // console.log(recipes);

          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return {
            type: RecipeActions.SET_RECIPES,
            payload: recipes
          };
        }
      ));



    });



  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

}
