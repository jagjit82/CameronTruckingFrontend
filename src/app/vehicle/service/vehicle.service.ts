import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RequestOptions, ResponseContentType } from '@angular/http';
import { tap } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private baseUrl = environment.baseUrl+'/vehicle';
  private baseUrl1 ='/export/vehicle';

  constructor(private http: HttpClient) { }

  createVehicle(vehicle: Object): Observable<Object> {

    console.log(location.origin);
    return this.http.post(`${this.baseUrl}/create`, vehicle);
  }

  updateVehicle(vehicle:Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update`, vehicle);
  }
  validateVehicleNum(vehicleNum:string): Observable<any>{
    return this.http.get(`${this.baseUrl}/findByVehicleName/${vehicleNum}`);
  }
  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  rejectVehicle(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/rejectvehicle/${id}`, { responseType: 'text' });
  }
  searchVehicle(vehicle: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/search`, vehicle);
  }
  insuranceExpiryRecords(): Observable<any> {
    return this.http.get(`${this.baseUrl}/insuranceExpiryRecords`);
  }
  permitExpiryRecords(): Observable<any> {
    return this.http.get(`${this.baseUrl}/permitExpiryRecords`);
  }
  fitnessExpiryRecords(): Observable<any> {
    return this.http.get(`${this.baseUrl}/fitnessExpiryRecords`);
  }
  countInsuranceRecords(): Observable<any> {
    return this.http.get(`${this.baseUrl}/countInsuranceRecords`);
  }
  countPermitRecords(): Observable<any> {
    return this.http.get(`${this.baseUrl}/countPermitRecords`);
  }
  countFitnessRecords(): Observable<any> {
    return this.http.get(`${this.baseUrl}/countFitnessRecords`);
  }
  getSearchPageCount(vehicle: Object):Observable<string>{
    return this.http.post<string>(`${this.baseUrl}/pageCount`,vehicle);
  }
  getSearchedRecordsCount(vehicle: Object):Observable<string>{
    return this.http.post<string>(`${this.baseUrl}/recordCount`,vehicle);
  }
  getTotalPages(company:string):any{
    return this.http.get(`${this.baseUrl}/count/${company}`);
  }
  getVehiclesListPage(pageNum:number,sortField:string,sortOrder:string,company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/all/${pageNum}/${sortField}/${sortOrder}/${company}`);
  }
  getVehiclesApprovalPage(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allapprovals/${company}`);
  }
  getVehiclesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  
  exportVehiclesList1(): any {
  let headers = new HttpHeaders({
    'Content-Type': 'application/vnd.ms-excel'
 });
 let options = {
  headers: headers
}
  
    return this.http.get(`/ramdascoldchain/export/vehicle`, options
        );
}
  
  exportVehiclesList(){
    let authKey = sessionStorage.getItem('basicauth');
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Authorization': authKey,
      })
    };
    //return this.http.get(`/ramdascoldchain/export/vehicle`,httpOptions);
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
  getPostVehicle(id: number): Observable<Object> {
    return this.http.post(`${this.baseUrl}/get`,id);
  }
  allUnmappedVehicles(): Observable<any> {
    console.log("----------=====>>")
    return this.http.get(`${this.baseUrl}/allUnmappedVehicles`);
  }
  getVehicle(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  countVehiclesCvipAndPlateExpiry(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/countVehiclesCvipAndPlateExpiry/${company}`);
  }
  vehiclesCvipAndPlateExpiry(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehiclesCvipAndPlateExpiry/${company}`);
  }
}
