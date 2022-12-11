import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RequestOptions, ResponseContentType } from '@angular/http';
import { tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { PhoneLogSearch } from '../phonelogSearch';

@Injectable({
  providedIn: 'root'
})
export class PhoneLogService {

  private baseUrl = environment.baseUrl+'/phoneLog';
  private baseUrl1 ='/export/phoneLog';

  constructor(private http: HttpClient) { }

  createphoneLog(phoneLog: Object): Observable<Object> {

    console.log(location.origin);
    return this.http.post(`${this.baseUrl}/create`, phoneLog);
  }

  updatephoneLog(phoneLog:Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update`, phoneLog);
  }
  deletephoneLog(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  getphoneLogsListPage(pageNum:number,sortField:string,sortOrder:string,company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/all/${pageNum}/${sortField}/${sortOrder}/${company}`);
  }
  searchPhoneLogs(phoneLog:PhoneLogSearch):Observable<any>{
    return this.http.post(`${this.baseUrl}/searchPhoneLog`, phoneLog);
  }
  searchPhoneLogCount(phoneLog:PhoneLogSearch):Observable<any>{
    return this.http.post(`${this.baseUrl}/searchPhoneLogCount`, phoneLog);
  }
  getphoneLogsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }
  getTotalPages(company:string):any{
    return this.http.get(`${this.baseUrl}/count/${company}`);
  }
  
  exportphoneLogsList1(): any {
  let headers = new HttpHeaders({
    'Content-Type': 'application/vnd.ms-excel'
 });
 let options = {
  headers: headers
}
  
    return this.http.get(`/ramdascoldchain/export/phoneLog`, options
        );
}
  
  exportphoneLogsList(){
    let authKey = sessionStorage.getItem('basicauth');
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Authorization': authKey,
      })
    };
    //return this.http.get(`/ramdascoldchain/export/phoneLog`,httpOptions);
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
  getPostphoneLog(id: number): Observable<Object> {
    return this.http.post(`${this.baseUrl}/get`,id);
  }
  allUnmappedphoneLogs(): Observable<any> {
    console.log("----------=====>>")
    return this.http.get(`${this.baseUrl}/allUnmappedphoneLogs`);
  }
  getphoneLog(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createfollowUpPhone(followUpPhone: Object): Observable<Object> {

    console.log(location.origin);
    return this.http.post(`${this.baseUrl}/createFollowUp`, followUpPhone);
  }
 
  getfollowUpPhone(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/followUp/${id}`);
  }
  getfollowUpPhoneListPage(id:number,company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allFollowUpPhone/${company}/${id}`);
  }
  
  deletefollowUpPhone(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/followUp/${id}`, { responseType: 'text' });
  }
}
