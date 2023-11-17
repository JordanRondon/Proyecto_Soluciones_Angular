import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoModel } from '../Model/Producto-model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private httClient: HttpClient) { 

  }
  getProducto():Observable<ProductoModel[]>{
    return this.httClient.get<ProductoModel[]>('http://localhost:8080/api/v1/producto'+'/list').pipe(map(res =>res));
    
  }
  saveProducto(request: any): Observable<any> {
    return this.httClient.post<any>('http://localhost:8080/api/v1/producto'+'/save',request).pipe(map(res =>res));
  }

  updateProducto(request: any): Observable<any> {
    return this.httClient.post<any>('http://localhost:8080/api/v1/producto'+'/update',request).pipe(map(res =>res));
  }

  deleteProducto(id: number): Observable<any> {
    return this.httClient.delete<ProductoModel[]>('http://localhost:8080/api/v1/producto'+'/delete/'+id).pipe(map(res =>res));
  }
}
