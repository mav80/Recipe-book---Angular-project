import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {RecipeService} from './recipes/recipe.service';
import { HttpModule } from '@angular/http';
import {DataStorageService} from './shared/data-storage.service';
import {SharedModule} from './shared/shared.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule,
    BrowserModule,
    HttpModule,
    SharedModule,
    ShoppingListModule,
    CoreModule,
    AppRoutingModule    // make sure this one is at the end of imports!
  ],
  providers: [RecipeService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
