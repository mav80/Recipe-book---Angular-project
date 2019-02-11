import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('beef', 17),
    new Ingredient('carrot', 8),
    new Ingredient('red beans', 381)
  ];

  // code below is no longer used because now we use central store - ngrx
  // getIngredients() {
  //   return this.ingredients.slice();
  // }
  //
  // addIngredient(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  //   this.ingredientsChanged.next(this.ingredients.slice());
  // }

  getIngredient(index: number) {
    return this.ingredients[index];
  }



  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); // instead of looping and adding
    // each ingredient separately and
    // emitting a lot of events we use new operator which spreads
    // the list into single elements and then add them and emit single event

    this.ingredientsChanged.next(this.ingredients.slice());
  }


  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }



}


