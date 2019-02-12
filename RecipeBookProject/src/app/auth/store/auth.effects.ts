import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {map, mergeMap} from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';
import {fromPromise} from 'rxjs-compat/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNUP), // use the pipeable ofType operator
    map((action: AuthActions.TrySignup) => {
      return action.payload;
    }))
      .switchMap((authData: {username: string, password: string}) => {
        return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username,
          authData.password));
      })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .pipe(mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    }));



  @Effect()
  authSignin: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNIN), // use the pipeable ofType operator
    map((action: AuthActions.TrySignin) => {
      return action.payload;
    }))
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username,
        authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .pipe(mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNIN
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    }));














    constructor(private actions$: Actions, private router: Router) {}
}
