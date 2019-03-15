import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
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
    // new Recipe('Recipe for great fun',
    //   'CBR in gravy',
    //   'https://mav.matcom.com.pl/2015-03-CBR1000RRFirebladeFull.jpg',
    //   [
    //     new Ingredient('Wheels', 2),
    //     new Ingredient('Engine', 170),
    //     new Ingredient('Driver armour', 1)
    //   ])

    new Recipe('Bigos',
      'Another Polish classic.' +
      '' +
      '1.  CARAMELIZE ONIONS & MUSHROOMS WITH BACON.  Place chopped onions in large stock pot with chopped raw bacon on medium heat. COVER. Mix occasionally until the onions start to brown.  Add mushrooms and cook until soft. Do not make the bacon crispy.\n' +
      '\n' +
      '2.  ADD MEAT. Add sausage and all meat, mixing and browning.  If you need more fat, add olive oil. You do not want to over cook the meat, just brown on the outside.  If you use good smoked Polish sausage, you do not need to brown very long.\n' +
      '\n' +
      '4.  ADD REST OF INGREDIENTS. Put all ingredients together in your large pot, but not the prunes. If there is not enough room, add the cabbage first to reduce it a little. \n' +
      '\n' +
      '5.  SAUTÉ FOR 2 TO 3 HOURS ON LOW.  Cook until you reduce the liquid and it becomes more of a thick stew. Mix every 20 minutes or so and make sure it is not dry. You can add more red wine or broth if needed. Bigos should always be juicy. Taste, but it will not have the flavor until the next day.  But, you can add more paprika or pepper. \n' +
      '\n' +
      '6.  ADD PRUNES.  Mix thoroughly and heat with prunes for another 10 minutes--until soft.  Enjoy with Rye bread (if you can\'t wait), or store in fridge.  Really good with Potato Cheese pierogi too--and Cabbage, Mushroom, and Kraut.',
      'https://static.smaker.pl/photos/f/2/c/f2ca5992e783850ec529918d39c310e1_360952_5a313a02d0544_wm.jpg',
      [
        new Ingredient('Sauerkraut', 3),
        new Ingredient('Shredded fresh white cabbage', 2),
        new Ingredient('Bacon', 1),
        new Ingredient('Beef', 1),
        new Ingredient('Mushrooms', 2),
        new Ingredient('Chopped prunes (cups)', 1),
        new Ingredient('Salt & pepper to taste', 1)
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
