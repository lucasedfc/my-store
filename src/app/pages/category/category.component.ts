import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  template: `<app-products [loading]="loading" (onLoadMore)="loadMore()" [products]="products"></app-products>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryId = params.get('id');
        if(this.categoryId)  {
          return this.productService.getByCategory(this.categoryId, this.limit, this.offset)
        }
        return [];
      })
    )
      .subscribe({
        next: (data => {
          this.products = data;
          this.loading = false;
        }),
        error: () => {
          this.loading = false;
        }
      })
  }

  loadMore() {
    this.loading = true;
    if(this.categoryId)
    this.productService
      .getByCategory(this.categoryId, this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
        this.loading = false;
      });
  }

}
