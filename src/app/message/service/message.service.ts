import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RequestOptions, ResponseContentType } from '@angular/http';
import { tap } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = environment.baseUrl+'/message';
  private baseUrl1 ='/export/message'; 

  constructor(private http: HttpClient) { }

  createmessage(message: Object): Observable<Object> {

    console.log(location.origin);
    return this.http.post(`${this.baseUrl}/create`, message);
  }
  updateStatusMessage(id: number){
    return this.http.get(`${this.baseUrl}/updatestatus/${id}`, { responseType: 'text' });
  }

  getMessagesById(id: number):Observable<any>{
    return this.http.get(`${this.baseUrl}/messages/${id}`);
  }
   updatemessage(message:Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update`, message);
  }
  deletemessage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  getmessagesListPage(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/all/${company}`);
  }
  getmessages(pageNum:number,sortField:string,sortOrder:string,company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/alldata/${pageNum}/${sortField}/${sortOrder}/${company}`);
  }

  getmessagesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  getTotalPages(company:string):any{
    return this.http.get(`${this.baseUrl}/countdata/${company}`);
  }

  exportmessagesList1(): any {
  let headers = new HttpHeaders({
    'Content-Type': 'application/vnd.ms-excel'
 });
 let options = {
  headers: headers
}
  
    return this.http.get(`/ramdascoldchain/export/message`, options
        );
}
  
  exportmessagesList(){
    let authKey = sessionStorage.getItem('basicauth');
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Authorization': authKey,
      })
    };
    //return this.http.get(`/ramdascoldchain/export/message`,httpOptions);
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
  getPostmessage(id: number): Observable<Object> {
    return this.http.post(`${this.baseUrl}/get`,id);
  }
  allUnmappedmessages(): Observable<any> {
    console.log("----------=====>>")
    return this.http.get(`${this.baseUrl}/allUnmappedmessages`);
  }
  getmessage(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createfollowUpActivity(followUpActivity: Object): Observable<Object> {

    console.log(location.origin);
    return this.http.post(`${this.baseUrl}/createFollowUp`, followUpActivity);
  }
 
  getfollowUpActivity(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/followUp/${id}`);
  }
  getfollowUpActivityListPage(id:number,company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allFollowUpActivity/${company}/${id}`);
  }
  
  deletefollowUpActivity(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/followUp/${id}`, { responseType: 'text' });
  }
}
