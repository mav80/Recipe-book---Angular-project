import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';


export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
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
  ];

  constructor(// private shoppingListService: ShoppingListService, //no longer necessary with ngrx
              // private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
  ) {}

  getRecipes() {
    return this.recipes.slice(); // this returns a copy of our array, so we make sure only copy may be changed, not original one in service
  }

  // no longer necessary as we do it directly in recipe detail component now
  // addIngredientsToShoppingList(ingredients: Ingredient[]) {
  //   // before ngrx
  //   // this.shoppingListService.addIngredients(ingredients);
  //
  //   this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  // }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());

  }


  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

}
