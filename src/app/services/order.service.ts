import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = "http://localhost:8080/api/v1/orders";

  urlOrderDetail = "http://localhost:8080/api/v1/order-detail";

  constructor(private httpClient: HttpClient) { }

  get() {
    return this.httpClient.get(this.url);
  }

  getById(id:number) {
    return this.httpClient.get(this.url+'/'+id);
  }

  getByOrder(id:number) {
    return this.httpClient.get(this.urlOrderDetail+'/order/'+id);
  }

  cancel(id: number, status: number) {
    return this.httpClient.put(`${this.url}/${id}?status=${status}`, {});
  }
  
  deliver(id: number, status: number) {
    return this.httpClient.put(`${this.url}/${id}?status=${status}`, {});
  }
  
  success(id: number, status: number) {
    return this.httpClient.put(`${this.url}/${id}?status=${status}`, {});
  }  
}
