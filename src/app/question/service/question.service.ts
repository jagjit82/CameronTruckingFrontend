import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RequestOptions, ResponseContentType } from '@angular/http';
import { tap } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl = environment.baseUrl+'/exam';
  private baseUrl1 =environment.baseUrl+'/questions/export'; 
  private baseUrl2 =environment.baseUrl+'/questions/import'; 

  constructor(private http: HttpClient) { }

  createquestion(question: Object): Observable<Object> {

    console.log(location.origin);
    return this.http.post(`${this.baseUrl}/createQuestion`, question);
  }
  
  getQuestionsById(id: number):Observable<any>{
    return this.http.get(`${this.baseUrl}/question/${id}`);
  }
   updatequestion(question:Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/questionUpdate`, question);
  }
  deletequestion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/question/${id}`, { responseType: 'text' });
  }
  getquestionsListPage(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allQuestion/${company}`);
  }
  getTotalPages(company:string):any{
    return this.http.get(`${this.baseUrl}/countQues/${company}`);
  }

  getquestions(pageNum:number,sortField:string,sortOrder:string,company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allQuestions/${pageNum}/${sortField}/${sortOrder}/${company}`);
  }
  
  getquestionsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  
  onUpload(file:File,company:string) {
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', file, file.name);
    uploadImageData.append('company', company);
    this.http.post(this.baseUrl2, uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
         //this.message = 'Image uploaded successfully';
       } else {
         //this.message = 'Image not uploaded successfully';
       }
      }
      );
  
  }
 
  
  exportquestionsList(company:string){
    let authKey = sessionStorage.getItem('basicauth');
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Authorization': authKey,
      })
    };
    //return this.http.get(`/ramdascoldchain/export/question`,httpOptions);
    return this.http.post(this.baseUrl1,company, { headers: new HttpHeaders({
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
  getPostquestion(id: number): Observable<Object> {
    return this.http.post(`${this.baseUrl}/get`,id);
  }
  allUnmappedquestions(): Observable<any> {
    console.log("----------=====>>")
    return this.http.get(`${this.baseUrl}/allUnmappedquestions`);
  }
  getquestion(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/question/${id}`);
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
