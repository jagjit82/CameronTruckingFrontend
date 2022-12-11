import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericDTO } from 'app/common/genericDTO';
import { Company } from './company';
import { environment } from 'environments/environment';
import { CompanyDetails } from 'app/companydetails/companydetails';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = environment.baseUrl+'/company';

  constructor(private http: HttpClient) { }

  
  getTotalPages(genericDTO:Object):Observable<any>{
    return this.http.post(`${this.baseUrl}/count`,genericDTO);
  }

  getTransportLicExpDriversListPage(): Observable<any> {
    return this.http.get(`${this.baseUrl}/transportLicExpRecords`);
  }
  getNonTransportLicExpDriversListPage(): Observable<any> {
    return this.http.get(`${this.baseUrl}/nonTransportLicExpRecords`);
  }
  getCompany(name:string):Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/find/${name}`);
  }
  countNonTransportLicExpRecords(): Observable<any> {
    return this.http.get(`${this.baseUrl}/countNonTransportLicExpRecords`);
  }
  
  createCompanyDetails(companyDetails: CompanyDetails): Observable<CompanyDetails> {
    return this.http.post<CompanyDetails>(`${this.baseUrl}/create`, companyDetails);
  }
  updateCompanyDetails(companyDetails: CompanyDetails): Observable<CompanyDetails> {
    return this.http.post<CompanyDetails>(`${this.baseUrl}/update`, companyDetails);
  }

  updateDriver(driver:object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update`, driver);
  }

  deleteDriver(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  
  getCompanyDetailsList(company:string): Observable<CompanyDetails> {
    return this.http.get<CompanyDetails>(`${this.baseUrl}/allCompanyDetails/${company}`);
  }
  allUnmappedDrivers(): Observable<any> {
    console.log("----------=====>>")
    return this.http.get(`${this.baseUrl}/allUnmappedDrivers`);
  }
  getDriversListPage(genericDTO:Object): Observable<any> {
     return this.http.post(`${this.baseUrl}/all`, genericDTO);
   }

   getCompanyReminder(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allCompanyDetailsReminder/${company}`);
  }
  countCompanyReminder(company:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/countAllCompanyDetailsReminder/${company}`);
  }
}
