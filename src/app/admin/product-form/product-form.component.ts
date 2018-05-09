import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../shared/services/category.service';
import {ProductService} from '../../shared/services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;

  constructor(
    private _router: Router,
    private _categoryService: CategoryService,
    private _productService: ProductService) {
    this.categories$ = _categoryService.getCategories();
  }

  save(product) {
    this._productService.create(product);
    this._router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
