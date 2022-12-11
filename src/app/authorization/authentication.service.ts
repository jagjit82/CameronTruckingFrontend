import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Employee } from 'app/employee/employee';
import { Location } from '@angular/common';
import { CommonService } from 'app/common/common.service';
import { Router } from '@angular/router';
import { Company } from 'app/company/company';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { EmployeeService } from 'app/employee/employee.service';


export class User {
  constructor(
    public status: string,
  ) { }

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = environment.baseUrl+'/employee';
  private employeeObs:Observable<any>;
  constructor(private httpClient: HttpClient,private router: Router,private location:Location,private empService:EmployeeService, private commonService:CommonService) { }

  // authenticate(username, password) {
  //   if (username === "jagjit" && password === "admin") {
  //     sessionStorage.setItem('username', username)
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  authenticate(username, password,company) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password)});
    this.employeeObs=this.httpClient.get<Employee>(`${this.baseUrl}/findByName/`+  username, { headers });
    return this.httpClient.get<Employee>(`${this.baseUrl}/validateLogin`, { headers }).subscribe(
      data => {
        this.employeeObs.subscribe(
          data => {
            if(company!=data.company.company){
                this.commonService.showErrorNotification('top','center',username+" , You are not registered with "+company);
                return;
            }else{
              sessionStorage.setItem('username', username);
              let authString = 'Basic ' + btoa(username + ':' + password);
              sessionStorage.setItem('company', company);
              sessionStorage.setItem('basicauth', authString);
              this.commonService.showLoginNotification('top','center',"Welcome  "+username+" - You have been logged in successfully.");
              this.router.navigate(['/listVehicle']);
      
            }
          });
          },
      error => {console.log(error),this.commonService.showErrorNotification('top','center',"Authentication Failed.")});
    
      }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  getEmployee(userName:string){
    this.httpClient.get<Employee>(`${this.baseUrl}/findByName/`+userName)
  }
  getUser(){
    let userName = sessionStorage.getItem('username');
    let authString = sessionStorage.getItem('basicauth');
    const headers = new HttpHeaders({ Authorization: authString});
    this.httpClient.get<Employee>(`${this.baseUrl}/findByName/`+userName, { headers }).subscribe(
      data => {
        sessionStorage.setItem('role', data.role);
        console.log("role is---=-=-=-"+data.role)
      });

  }
  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');

  }
 
}