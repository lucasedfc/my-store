import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  CreateProductDto,
  Product,
  UpdateProductDto,
} from '../../models/product.model';
import { switchMap } from 'rxjs/operators';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import Swal from 'sweetalert2';
import { zip } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onLoadMore = new EventEmitter<string>();
  @Input() loading = false;
  @Input() products: Product[] = [];
  @Input()
  set productId(id: string | null) {
    if(id) {
      this.onShowDetail(id);
    }
  }
  myShoppingCart: Product[] = [];
  total = 0;
  showProductDetail: boolean = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: '',
  };
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    if(!this.showProductDetail) {
      this.showProductDetail = true;
    }
    this.productsService.getProductById(id).subscribe({
      next: (product: Product) => {
        this.statusDetail = 'success';
        this.productChosen = product;
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text: err,
          icon: 'error',
        });
        this.statusDetail = 'error';
      },
    });
  }

  createNewProduct() {
    const product: CreateProductDto = {
      description: 'Lorem Ipsum sasda',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 321,
      title: 'New Product',
      categoryId: 2,
    };
    this.productsService.create(product).subscribe({
      next: (data: Product) => {
        console.log('created', data);
        this.products.unshift(data);
      },
    });
  }

  updateProduct() {
    const changes: UpdateProductDto = {
      title: 'Title Modified',
      description: 'That is what she said!',
    };

    const { id } = this.productChosen;

    this.productsService.update(id, changes).subscribe({
      next: (data: Product) => {
        const productIndex = this.products.findIndex(
          (item) => item.id == this.productChosen.id
        );
        this.products[productIndex] = data;
        this.productChosen = data;
      },
    });
  }

  readAndUpdate(id: string) {
    this.productsService
      .getProductById(id)
      .pipe(
        switchMap((product) =>
          this.productsService.update(product.id, { title: 'change' })
        )
      )
      .subscribe((data) => {
        console.log(data);
      });
    this.productsService
      .fetchReadAndUpdate(id, { title: 'change' })
      .subscribe((response) => {
        const read = response[0];
        const update = response[1];
      });
  }

  fetchReadAndUpdate(id: string) {
    return zip(
      // run on parallel, recomended in service not in component.
      this.productsService.getProductById(id),
      this.productsService.update(id, { title: 'new' })
    ).subscribe((response) => {
      const product = response[0];
      const update = response[1];
    });
  }

  deleteProduct() {
    const { id } = this.productChosen;
    this.productsService.delete(id).subscribe({
      next: () => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChosen.id
        );
        this.products.splice(productIndex, 1);
        this.showProductDetail = false;
      },
    });
  }

  loadMore() {
    this.onLoadMore.emit();
  }
}
