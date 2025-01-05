import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../common/Customer';
import { Observable } from 'rxjs';
import { ApiResponse } from '../common/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = "http://localhost:8080/api/v1/users";

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  post(customer: Customer) {
    return this.httpClient.post(this.url, customer);
  }

  getUserById(id: number) {
    return this.httpClient.get(this.url + '/' + id);
  }

  getByEmail(email: string) {
    return this.httpClient.get(this.url + '/email/' + email);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(this.url + '/' + id);
  }

  update(id: number, customer: Customer) {
    return this.httpClient.put(this.url + '/' + id, customer);
  }
}
