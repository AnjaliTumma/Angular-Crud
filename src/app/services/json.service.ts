import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(private http:HttpClient) { }
  getUsers():Observable<any>{
   return this.http.get("http://localhost:3000/users");
  }
  addCustomer(customerForm:any):Observable<any  >{
    return this.http.post("http://localhost:3000/Customers", customerForm)
  }
  getCustomer():Observable<any>{
    return this.http.get("http://localhost:3000/Customers")
  }
  deleteCustomer(id:any):Observable<any>{
    return this.http.delete("http://localhost:3000/Customers/"+id)
  }
  updateCustomer(id:any,customerForm:any):Observable<any>{
    return this.http.put("http://localhost:3000/Customers/"+id,customerForm)
  }
}
