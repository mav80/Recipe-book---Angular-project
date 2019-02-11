import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  // no longers used - we use ngrx now
  // shoppingListServiceSubscribtion: Subscription;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');

    // no longers used - we use ngrx now
    // this.shoppingListServiceSubscribtion = this.shoppingListService.ingredientsChanged.subscribe((
    //   ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    //   }
    // );
  }


  // no longers used - we use ngrx now
  // ngOnDestroy(): void {
  //   this.shoppingListServiceSubscribtion.unsubscribe();
  // }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

}
