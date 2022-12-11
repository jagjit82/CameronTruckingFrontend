import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentPaymentService {

  private baseUrl = environment.baseUrl+'/studentPayment';
  private baseUrl1 = '/camerondriveredu/export/studentPayment';

  constructor(private http: HttpClient) { }


  getStudentPayment(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getTotalPaymentsByStudent(studentId:number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/totalPayments/${studentId}`);
  }
  getTotalPaymentsByStudentForEdit(studentId:number,studentPaymentId:number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/totalPaymentsForEdit/${studentId}/${studentPaymentId}`);
  }
  
  createStudentPayment(studentPayment: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, studentPayment);
  }
  searchStudentPayment(studentPayment: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/search`, studentPayment);
  }
  sumStudentPayment(studentPayment: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/sumStudentPayment`, studentPayment);
  }
  activateStudentPayment(studentPayment: Object):Observable<any>{
    return this.http.post(`${this.baseUrl}/activatelog`,studentPayment);
  }
  deactivateStudentPayment(studentPayment: Object):Observable<any>{
    return this.http.post(`${this.baseUrl}/deactivatelog`,studentPayment);
  }
  
  exportSearchStudentPayment(studentPayment: Object){
    let authKey = sessionStorage.getItem('basicauth');
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Authorization': authKey,
      })
    };
    //return this.http.get(`/ramdascoldchain/export/truck`,httpOptions);
    return this.http.post(this.baseUrl1,studentPayment, { headers: new HttpHeaders({
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

  updateStudentPayment(studentPayment:object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update`, studentPayment);
  }

  deleteStudentPayment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  rejectStudentPayment(id:number): Observable<any>{
    return this.http.get(`${this.baseUrl}/rejectStudentPayment/${id}`);
  }
  getStudentPaymentsById(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/all/${id}`); 
  }
   
  getTotalPages(company:string):Observable<any>{
    return this.http.get<string>(`${this.baseUrl}/count/${company}`);
  }
  getSearchPageCount(studentPayment: Object):Observable<string>{
    return this.http.post<string>(`${this.baseUrl}/pageCount`,studentPayment);
  }
  getSearchedRecordsCount(studentPayment: Object):Observable<string>{
    return this.http.post<string>(`${this.baseUrl}/recordCount`,studentPayment);
  }
    
  getStudentPaymentsListPage(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/all/${company}`);
  }
  getStudentPaymentPage(pageNum:number,sortField:string,sortOrder:string,company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/all/${pageNum}/${sortField}/${sortOrder}/${company}`);
  }
  getStudentPaymentsApprovalPage(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allapprovals/${company}`);
  }
  getStudentPaymentsReminder(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allStudentPaymentReminder/${company}`);
  }
  countStudentReminderRecords(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/countAllStudentPaymentReminder/${company}`);
  }
 
  }
