import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private _db: AngularFireDatabase) {
  }

  create(product) {
    return this._db.list('/products').push(product);
  }

  getAll() {
    return this._db.list('/products');
  }

  getProduct(productId) {
    return this._db.object('/products/' + productId);
  }

  update(productId, product) {
    return this._db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this._db.object('/products/' + productId).remove();
  }
}
