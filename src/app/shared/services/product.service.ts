import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private _db: AngularFireDatabase) {
  }

  create(product) {
    return this._db.list('/products').push(product);
  }
}
