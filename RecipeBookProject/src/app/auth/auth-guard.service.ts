import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.store.select('auth')
      .take(1)
      .map((authState: fromAuth.State) => {

        if (!authState.authenticated) {
          this.router.navigate(['/signin']);
        }

        return authState.authenticated;
      });

    // pre-ngrx:

    // if (!this.authService.isAuthenticated()) {
    //   this.router.navigate(['/']);
    //   return false;
    // } else {
    //   return true;
    // }

  }
}
