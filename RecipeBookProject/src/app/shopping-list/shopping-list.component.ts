import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient = [
    new Ingredient('schab', 1),
    new Ingredient('ziemniaki', 5),
    new Ingredient('sałatka', 2)
  ];

  constructor() { }

  ngOnInit() {
  }

}
