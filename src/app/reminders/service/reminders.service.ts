import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RequestOptions, ResponseContentType } from '@angular/http';
import { tap } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {

  private baseUrl = environment.baseUrl+'/reminders';
  private baseUrl1 ='/export/reminders';

  constructor(private http: HttpClient) { }

  createreminders(reminders: Object): Observable<Object> {

    console.log(location.origin);
    return this.http.post(`${this.baseUrl}/create`, reminders);
  }

  updatereminders(reminders:Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update`, reminders);
  }
  deletereminders(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  getreminderssListPage(pageNum:number,sortField:string,sortOrder:string,company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/all/${pageNum}/${sortField}/${sortOrder}/${company}`);
  }
  
  getremindersList(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/all/${company}`);
  }

  
  exportreminderssList1(): any {
  let headers = new HttpHeaders({
    'Content-Type': 'application/vnd.ms-excel'
 });
 let options = {
  headers: headers
}
  
    return this.http.get(`/ramdascoldchain/export/reminders`, options
        );
}
  
  exportreminderssList(){
    let authKey = sessionStorage.getItem('basicauth');
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Authorization': authKey,
      })
    };
    //return this.http.get(`/ramdascoldchain/export/reminders`,httpOptions);
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
  getPostreminders(id: number): Observable<Object> {
    return this.http.post(`${this.baseUrl}/get`,id);
  }
  allUnmappedreminderss(): Observable<any> {
    console.log("----------=====>>")
    return this.http.get(`${this.baseUrl}/allUnmappedreminderss`);
  }
  getreminders(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

}
