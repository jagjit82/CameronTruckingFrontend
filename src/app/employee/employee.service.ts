import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = environment.baseUrl+'/employee';

  constructor(private http: HttpClient) { }

  getEmployee(id: number): Observable<any> { 
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: Object): Observable<Object> {
    console.log(location.origin);
    return this.http.post(`${this.baseUrl}/create`, employee);
  }

  
  updateEmployee(employee:object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update`,employee);
  }
  validateUser(userName:string): Observable<any>{
    return this.http.get(`${this.baseUrl}/findByName/${userName}`);
  }
  findByUser(userName:string): Observable<Employee>{
    return this.http.get<Employee>(`${this.baseUrl}/findByName/${userName}`);
  }
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  deactivateEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/DEACTIVATE/${id}`, { responseType: 'text' });
  }
  activateEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/ACTIVATE//${id}`, { responseType: 'text' });
  }
  countApprovals():Observable<any>{
    return this.http.get(`${this.baseUrl}/countapprovals`);
  }
  
  getEmployeesList(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/all/${company}`);
  }



  getEmployeeHourLog(id: number): Observable<any> { 
    return this.http.get(`${this.baseUrl}/employeehourlog/${id}`);
  }

  createEmployeeHourLog(employee: Object): Observable<Object> {
    console.log(location.origin);
    return this.http.post(`${this.baseUrl}/createemployeehourlog`, employee);
  }

  
  updateEmployeeHourLog(employee:object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/updateemployeehourlog`,employee);
  }
  
  deleteEmployeeHourLog(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/employeehourlog/${id}`, { responseType: 'text' });
  }
  
  getEmployeesHourLogList(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allemployeehourlog/${company}`);
  }
}
