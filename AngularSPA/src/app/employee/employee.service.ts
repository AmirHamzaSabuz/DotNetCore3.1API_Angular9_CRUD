import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = 'https://localhost:44366/employees';
  constructor(private httpClient: HttpClient) { }

  saveEmployee(employee){
    return this.httpClient.post(this.baseUrl, employee);
  }

  updateEmployee(employee){
    return this.httpClient.put(this.baseUrl, employee);
  }

  getAllEmployees(){
    return this.httpClient.get(this.baseUrl);
  }

  getEmployeeById(id){
    return this.httpClient.get(this.baseUrl + '/' + id);
  }

  deleteEmployee(id){
    return this.httpClient.delete(this.baseUrl + '/' + id);
  }
}
