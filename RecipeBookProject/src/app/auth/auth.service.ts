import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              private store: Store<fromApp.AppState>) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        user => {
          this.store.dispatch(new AuthActions.Signup());
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.store.dispatch(new AuthActions.SetToken(token))
            );
        }
      )
      .catch( error => console.log('SignUp error: ' + error));
  }




  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( response => {console.log(response);
        this.store.dispatch(new AuthActions.Signin());
        this.router.navigate(['/']);
      firebase.auth().currentUser.getIdToken()
        .then(
          (token: string) => this.store.dispatch(new AuthActions.SetToken(token))
        );
      })
      .catch( error => console.log('Login error: ' + error));
  }

  // pre-ngrx
  // getToken() {
  //   firebase.auth().currentUser.getIdToken().then(
  //     (token: string) => this.token = token);
  //   return this.token;
  // }
  //
  // isAuthenticated() {
  //   return this.token != null;
  // }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/']);
  }

}
