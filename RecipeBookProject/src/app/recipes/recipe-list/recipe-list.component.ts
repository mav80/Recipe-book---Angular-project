import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test recipe', 'This is a test', 'https://i.wpimg.pl/O/644x432/d.wpimg.pl/1831575938-1560570594/kotlet-schabowy.jpg'),
    new Recipe('Test recipe', 'This is a test', 'https://i.wpimg.pl/O/644x432/d.wpimg.pl/1831575938-1560570594/kotlet-schabowy.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
