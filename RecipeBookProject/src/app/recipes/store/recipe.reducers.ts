import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';

export interface FeatureState {
  recipes: State;
}


export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe('Pork chop with potatoes and salad',
      'A truly Polish treat!',
      'https://i.wpimg.pl/O/644x432/d.wpimg.pl/1831575938-1560570594/kotlet-schabowy.jpg',
      [
        new Ingredient('Pork chops', 1),
        new Ingredient('Potatoes', 5),
        new Ingredient('Vegetable salad', 2)
      ]),
    new Recipe('Recipe for great fun',
      'CBR in gravy',
      'https://mav.matcom.com.pl/2015-03-CBR1000RRFirebladeFull.jpg',
      [
        new Ingredient('Wheels', 2),
        new Ingredient('Engine', 170),
        new Ingredient('Driver armour', 1)
      ])
  ]
};


export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {

  switch(action.type) {
    case (RecipeActions.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      };

    case (RecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case (RecipeActions.UPDATE_RECIPE):

      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: recipes
      };


    case (RecipeActions.DELETE_RECIPE):

      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };

    default:
      return state;
  }

}
