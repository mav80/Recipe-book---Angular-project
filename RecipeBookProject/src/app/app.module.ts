import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {RecipeService} from './recipes/recipe.service';
import { HttpModule } from '@angular/http';
import {DataStorageService} from './shared/data-storage.service';
import {RecipesModule} from './recipes/recipes.module';
import {SharedModule} from './shared/shared.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {AuthModule} from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    AuthModule,
    BrowserModule,
    HttpModule,
    RecipesModule,
    SharedModule,
    ShoppingListModule,
    AppRoutingModule    // make sure this one is at the end of imports!
  ],
  providers: [RecipeService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
