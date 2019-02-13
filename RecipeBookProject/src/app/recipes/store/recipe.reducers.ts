import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';

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


export function recipeReducer(state = initialState, action) {
  return state;
}