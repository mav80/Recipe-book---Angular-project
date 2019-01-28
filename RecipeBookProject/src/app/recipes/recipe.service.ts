import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

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

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice(); // this returns a copy of our array, so we make sure only copy may be changed, not original one in service
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

}
