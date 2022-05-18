import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { throwError, zip } from 'rxjs';

import {
  CreateProductDto,
  Product,
  UpdateProductDto,
} from './../models/product.model';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})


export class ProductsService {
  private apiUrl: string = `${environment.API_URL}/api/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {

    let params = new HttpParams();
    if (limit && offset) {

      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params, context: checkTime() })
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.InternalServerError) {
          return throwError('Error en Server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas autorizado');
        }

        return throwError('Algo salio mal');
      })
    );
  }

  getProductByPage(limit: number, offset: number) {
    return this.http
      .get<Product[]>(`${this.apiUrl}`, {
        params: {
          limit,
          offset,
        },
        context: checkTime()
      })
      .pipe(retry(3));
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDto) {
    return zip(
      this.getProductById(id),
      this.update(id, dto)
    );
  }

  create(data: CreateProductDto) {
    return this.http.post<Product>(`${this.apiUrl}`, data);
  }

  update(id: string, data: UpdateProductDto) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
