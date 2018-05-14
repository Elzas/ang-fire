import {UserService} from './user.service';
import {User} from '../models/user';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private _userService: UserService,
    private _afAuth: AngularFireAuth,
    private _route: ActivatedRoute) {
    this.user$ = _afAuth.authState;
  }

  login() {
    let returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this._afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this._afAuth.auth.signOut();
  }

  resetPassword(email: string) {
    let auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error));
  }

  get appUser$(): Observable<User> {
    return this.user$
      .switchMap(user => {
        if (user) return this._userService.get(user.uid);

        return Observable.of(null);
      });
  }
}
