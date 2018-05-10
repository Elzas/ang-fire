import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../shared/services/category.service';
import {ProductService} from '../../shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$;
  product = {};
  id;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _categoryService: CategoryService,
    private _productService: ProductService) {
    this.categories$ = _categoryService.getCategories();

    this.id = this._route.snapshot.paramMap.get('id');
    if (this.id) this._productService.getProduct(this.id)
      .take(1)
      .subscribe(p => this.product = p);
  }

  save(product) {
    if (this.id) this._productService.update(this.id, product);
    else this._productService.create(product);

    this._router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product.ts?')) return;

    this._productService.delete(this.id);
    this._router.navigate(['/admin/products']);
  }

}
