import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RequestOptions, ResponseContentType } from '@angular/http';
import { tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { ExpenseLogSearch } from '../expenselogSearch';

@Injectable({
  providedIn: 'root'
})
export class ExpenseLogService {

  private baseUrl = environment.baseUrl+'/expense/log';
  private baseUrl1 =environment.baseUrl+'/export/expenseLog';
  private baseUrl2 =environment.baseUrl+'/export/yearExpenseLog';

  constructor(private http: HttpClient) { }

  createExpenseLog(expenseLog: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, expenseLog);
  }

  updateexpenseLog(expenseLog:Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update`, expenseLog);
  }
  deleteexpenseLog(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  getexpenseLogsListPage(pageNum:number,sortField:string,sortOrder:string,company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/all/${pageNum}/${sortField}/${sortOrder}/${company}`);
  }
  searchExpenseLogs(expenseLog:ExpenseLogSearch):Observable<any>{
    return this.http.post(`${this.baseUrl}/search`, expenseLog);
  }

  sumExpenseLogs(expenseLog:ExpenseLogSearch):Observable<any>{
    return this.http.post(`${this.baseUrl}/expensesum`, expenseLog);
  }
  sumIncomeLogs(expenseLog:ExpenseLogSearch):Observable<any>{
    return this.http.post(`${this.baseUrl}/incomesum`, expenseLog);
  }
  searchExpenseLogCount(expenseLog:ExpenseLogSearch):Observable<any>{
    return this.http.post(`${this.baseUrl}/count`, expenseLog);
  }
  getexpenseLogsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }
  getTotalPages(company:string):any{
    return this.http.get(`${this.baseUrl}/count/${company}`);
  }
  
  exportexpenseLogsList1(): any {
  let headers = new HttpHeaders({
    'Content-Type': 'application/vnd.ms-excel'
 });
 let options = {
  headers: headers
}
  
    return this.http.get(`/ramdascoldchain/export/expenseLog`, options
        );
}
  
  exportexpenseLogsList(){
    let authKey = sessionStorage.getItem('basicauth');
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Authorization': authKey,
      })
    };
    //return this.http.get(`/ramdascoldchain/export/expenseLog`,httpOptions);
    return this.http.get(this.baseUrl1, { headers: new HttpHeaders({
      'Authorization': 'bearer '+ sessionStorage.getItem('basicauth'),
      'Content-Type': 'application/vnd.ms-excel',
    }), responseType: 'blob'}).pipe (
    tap (
        // Log the result or error
        data => {console.log(data);
        var blob = new Blob([data], { type: 'application/vnd.ms-excel' });
        var url= window.URL.createObjectURL(blob);
        window.open(url);
        //error => console.log(error)}
        })
   );
  }

  // downloadClasspathFile() {
  //   this.downloadService.downloadClasspathFile(this.classpathFileName)
  //     .subscribe(response => {
  //       const filename = response.headers.get('filename');
 
  //       this.saveFile(response.body, filename);
  //     });
  // }
 
  // saveFile(data: any, filename?: string) {
  //   const blob = new Blob([data], {type: 'text/csv; charset=utf-8'});
  //   fileSaver.saveAs(blob, filename);
  // }
  getPostexpenseLog(id: number): Observable<Object> {
    return this.http.post(`${this.baseUrl}/get`,id);
  }
  allUnmappedexpenseLogs(): Observable<any> {
    console.log("----------=====>>")
    return this.http.get(`${this.baseUrl}/allUnmappedexpenseLogs`);
  }
  getexpenseLog(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createfollowUpExpense(followUpExpense: Object): Observable<Object> {

    console.log(location.origin);
    return this.http.post(`${this.baseUrl}/createFollowUp`, followUpExpense);
  }
 
  getfollowUpExpense(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/followUp/${id}`);
  }
  getfollowUpExpenseListPage(id:number,company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allFollowUpExpense/${company}/${id}`);
  }
  
  deletefollowUpExpense(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/followUp/${id}`, { responseType: 'text' });
  }

  
  exportSearchExpenseLog(expenselog: Object){
    let authKey = sessionStorage.getItem('basicauth');
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Authorization': authKey,
      })
    };
    //return this.http.get(`/ramdascoldchain/export/truck`,httpOptions);
    return this.http.post(this.baseUrl1,expenselog, { headers: new HttpHeaders({
      'Authorization': 'bearer '+ sessionStorage.getItem('basicauth'),
      'Content-Type': 'application/json',
    }), responseType: 'blob'}).pipe (
    tap (
        // Log the result or error
        data => {console.log(data);
        var blob = new Blob([data], { type: 'application/vnd.ms-excel' });
        var url= window.URL.createObjectURL(blob);
        window.open(url);
        //error => console.log(error)}
        })
   );
  }

  exportSearchExpenseLogMonthly(expenselog: Object){
    let authKey = sessionStorage.getItem('basicauth');
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Authorization': authKey,
      })
    };
    //return this.http.get(`/ramdascoldchain/export/truck`,httpOptions);
    return this.http.post(this.baseUrl2,expenselog, { headers: new HttpHeaders({
      'Authorization': 'bearer '+ sessionStorage.getItem('basicauth'),
      'Content-Type': 'application/json',
    }), responseType: 'blob'}).pipe (
    tap (
        // Log the result or error
        data => {console.log(data);
        var blob = new Blob([data], { type: 'application/vnd.ms-excel' });
        var url= window.URL.createObjectURL(blob);
        window.open(url);
        //error => console.log(error)}
        })
   );
  }
}
