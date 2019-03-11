import * as ShoppingListActions from './shopping-list.actions';
import {Ingredient} from '../../shared/ingredient.model';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients:  [
    new Ingredient('beef', 17),
    new Ingredient('carrot', 8),
    new Ingredient('red beans', 381)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {



    case ShoppingListActions.ADD_INGREDIENT:

      for (let i = 0; i < state.ingredients.length; i ++) {

        if (state.ingredients[i].name === action.payload.name) {

          // if ingredient already exists in the list, just add count (existing ingredient + new ingredient) and return ingredients without
          // adding new one to the list
          state.ingredients[i].amount = state.ingredients[i].amount + action.payload.amount;

          return {
            ...state,
            ingredients: [...state.ingredients]
          };

        }
      }

      // if ingredient not found, add to list
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };



    case ShoppingListActions.ADD_INGREDIENTS:

      let oldIngredients2 = state.ingredients.map(a => ({...a}));
      let payloadCopy = action.payload.map(a => ({...a}));

      for (let i = 0; i < state.ingredients.length ; i++) {

        for (let j = payloadCopy.length - 1; j > -1 ; j--) {

          if (state.ingredients[i].name === payloadCopy[j].name) {
            oldIngredients2[i].amount = oldIngredients2[i].amount + payloadCopy[j].amount;
            payloadCopy.splice(j, 1);
          }

        }

      }

      oldIngredients2 = [...oldIngredients2, ...payloadCopy];

      return {
        ...state,
        // ingredients: [...state.ingredients, ...action.payload] //original code
        ingredients: oldIngredients2
      };




    // case ShoppingListActions.ADD_INGREDIENTS:
    //
    //   console.log('action.payload na wejściu: ' + action.payload.length);
    //
    //   let oldIngredients2 = [...state.ingredients];
    //   let payloadCopy = [...action.payload];
    //
    //   console.log('payloadCopy na wejściu: ' + payloadCopy.length);
    //   console.log('oldIngredients2 na wejściu: ' + oldIngredients2.length);
    //
    //   for (let i = 0; i < state.ingredients.length ; i++) {
    //
    //     for (let j = payloadCopy.length - 1; j > -1 ; j--) {
    //
    //       if (oldIngredients2[i].name === payloadCopy[j].name) {
    //         console.log('!!!!!!payload hit: ' + j + ' ' + payloadCopy[j].name);
    //         // console.log(oldIngredients2[i].amount + ' ' + payloadCopy[j].amount);
    //         oldIngredients2[i].amount = oldIngredients2[i].amount + payloadCopy[j].amount;
    //         payloadCopy.splice(j, 1);
    //       }
    //
    //     }
    //
    //   }
    //
    //   oldIngredients2 = [...oldIngredients2, ...payloadCopy];
    //
    //   console.log('oldIngredients2 length: ' + oldIngredients2.length);
    //   console.log('action.payload length: ' + action.payload.length);
    //   console.log('payloadCopy length: ' + payloadCopy.length);
    //   console.log('oldIngredients2: ' + oldIngredients2);
    //
    //   return {
    //     ...state,
    //     // ingredients: [...state.ingredients, ...action.payload]
    //     ingredients: oldIngredients2
    //   };








    case ShoppingListActions.UPDATE_INGREDIENT:

      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
    };

      const ingredients = [...state.ingredients];
      // const oldIngredients = [...state.ingredients];

      for (let i = 0; i < state.ingredients.length; i ++) {

        if (state.ingredients[i].name === action.payload.ingredient.name && i !== state.editedIngredientIndex) {

          // if ingredient of such name already exists in the list and it's not the ingredient we currently edit, just add
          // count (existing ingredient + new ingredient) to the old ingredient and delete edited one
          state.ingredients[i].amount = state.ingredients[i].amount + action.payload.ingredient.amount;

          let oldIngredients = [...state.ingredients];
          oldIngredients.splice(state.editedIngredientIndex, 1);

          return {
            ...state,
            ingredients: oldIngredients,
            editedIngredient: null,
            editedIngredientIndex: -1
          };

        }
      }

      ingredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };









    case ShoppingListActions.DELETE_INGREDIENT:

      let oldIngredients = [...state.ingredients];

      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };



    case ShoppingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      };




    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };



    default:
      return state;

  }

}
