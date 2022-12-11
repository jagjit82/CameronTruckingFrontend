import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericDTO } from 'app/common/genericDTO';
import { environment } from 'environments/environment';
import { InstructorSearch } from 'app/instructorlog/instructorsearch';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private baseUrl = environment.baseUrl+'/instructor';

  constructor(private http: HttpClient) { }

  getInstructor(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getTotalPages(genericDTO:Object):Observable<any>{
    return this.http.post(`${this.baseUrl}/count`,genericDTO);
  }

  getTransportLicExpInstructorsListPage(): Observable<any> {
    return this.http.get(`${this.baseUrl}/transportLicExpRecords`);
  }
  getNonTransportLicExpInstructorsListPage(): Observable<any> {
    return this.http.get(`${this.baseUrl}/nonTransportLicExpRecords`);
  }
  countTransportLicExpRecords(): Observable<any> {
    return this.http.get(`${this.baseUrl}/countTransportLicExpRecords`);
  }
  countNonTransportLicExpRecords(): Observable<any> {
    return this.http.get(`${this.baseUrl}/countNonTransportLicExpRecords`);
  }
  createInstructor(instructor: Object): Observable<Object> {
    console.log(location.origin);
    return this.http.post(`${this.baseUrl}/create`, instructor);
  }

  updateInstructor(instructor:object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update`, instructor);
  }

  deleteInstructor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getInstructorsList(): Observable<any> {
    console.log("----------=====>>")
    return this.http.get(`${this.baseUrl}/all`);
  }
  
  allUnmappedInstructors(): Observable<any> {
    console.log("----------=====>>")
    return this.http.get(`${this.baseUrl}/allUnmappedInstructors`);
  }
  getInstructorsListPage(genericDTO:Object): Observable<any> {
     return this.http.post(`${this.baseUrl}/all`, genericDTO);
   }
   getInstructors(pageNum:number,sortField:string,sortOrder:string,company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/alldata/${pageNum}/${sortField}/${sortOrder}/${company}`);
  }
  getTotalPageCount(company:string):any{
    return this.http.get(`${this.baseUrl}/countdata/${company}`);
  }
   countInstructorExpiryReminder(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/countInstructorExpiryReminder/${company}`);
  }
  instructorExpiryReminder(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allInstructorExpiryReminder/${company}`);
  }

  createinstructorLog(instructorLog: Object): Observable<Object> {

    console.log(location.origin);
    return this.http.post(`${this.baseUrl}/createinstructorlog`, instructorLog);
  }

  updateinstructorLog(instructorLog:Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/createinstructorlog`, instructorLog);
  }
  deleteinstructorLog(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/instructorlog/${id}`, { responseType: 'text' });
  }
  
  getInstructorLog(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/instructorlog/${id}`);
  }
  
  getinstructorLogsListPage(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allinstructorlog/${company}`);
  }
  searchinstructorLogs(instructorSearch:InstructorSearch): Observable<any> {
    return this.http.post(`${this.baseUrl}/searchinstructorLogs`,instructorSearch);
  }
  
  sumHourInstructorLogsSearch(instructorSearch:InstructorSearch): Observable<any> {
    return this.http.post(`${this.baseUrl}/sumhourinstructorLogssearch`,instructorSearch);
  }
  
  getinstructorLogsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

}
