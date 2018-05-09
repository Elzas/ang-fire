import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class CategoryService {

  constructor(private _db: AngularFireDatabase) {
  }

  getCategories() {
    return this._db.list('/categories', {
      query: {
        orderByChild: 'name'
      }
    });
  }
}
