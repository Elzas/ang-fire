import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase';
import {User} from '../models/user';


@Injectable()
export class UserService {

  constructor(private _db: AngularFireDatabase) {
  }

  save(user: firebase.User) {
    this._db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): FirebaseObjectObservable<User> {
    return this._db.object('/users/' + uid)
  }
}
