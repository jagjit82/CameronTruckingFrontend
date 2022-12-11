import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RequestOptions, ResponseContentType } from '@angular/http';
import { tap } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {

  private baseUrl = environment.baseUrl+'/activitylog';
  private baseUrl1 ='/export/activityLog';

  constructor(private http: HttpClient) { }

  createactivityLog(activityLog: Object): Observable<Object> {

    console.log(location.origin);
    return this.http.post(`${this.baseUrl}/create`, activityLog);
  }

  updateactivityLog(activityLog:Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update`, activityLog);
  }
  deleteactivityLog(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  getactivityLogsListPage(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/all/${company}`);
  }
  
  getactivityLogsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  
  exportactivityLogsList1(): any {
  let headers = new HttpHeaders({
    'Content-Type': 'application/vnd.ms-excel'
 });
 let options = {
  headers: headers
}
  
    return this.http.get(`/ramdascoldchain/export/activityLog`, options
        );
}
  
  exportactivityLogsList(){
    let authKey = sessionStorage.getItem('basicauth');
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Authorization': authKey,
      })
    };
    //return this.http.get(`/ramdascoldchain/export/activityLog`,httpOptions);
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
  getPostactivityLog(id: number): Observable<Object> {
    return this.http.post(`${this.baseUrl}/get`,id);
  }
  allUnmappedactivityLogs(): Observable<any> {
    console.log("----------=====>>")
    return this.http.get(`${this.baseUrl}/allUnmappedactivityLogs`);
  }
  getactivityLog(id: number): Observable<any> {
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
