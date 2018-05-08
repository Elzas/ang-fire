import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/user';
import {UserService} from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private _afAuth: AngularFireAuth,
              private _route: ActivatedRoute,
              private _userService: UserService) {
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

  get appUser$(): Observable<User> {
    return this.user$
      .switchMap(user => {
        if (user) return this._userService.get(user.uid);

        return Observable.of(null);
      });
  }
}
