import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('beef', 17),
    new Ingredient('carrot', 8),
    new Ingredient('red beans', 381)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); // instead of looping and adding
    // each ingredient separately and
    // emitting a lot of events we use new operator which spreads
    // the list into single elements and then add them and emit single event

    this.ingredientsChanged.emit(this.ingredients.slice());
  }

}
