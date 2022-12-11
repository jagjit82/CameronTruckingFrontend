import { Observable } from "rxjs";
import { Company } from "../company";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { GenericDTO } from "app/common/genericDTO";
import { CompanyService } from "../companyservice";

@Component({
  selector: "app-driver-list",
  templateUrl: "./company-list.component.html",
  styleUrls: ["./company-list.component.css"]
})
export class CompanyListComponent implements OnInit {
  drivers: Observable<Company[]>;
  role:string;
  pageNum:number=0;
  totalPages:number=0;
  searchInstructor:string;
  genericDTO:GenericDTO= new GenericDTO();

  constructor(private companyService: CompanyService,private commonService:CommonService,
    private router: Router) {}

  ngOnInit() {
    this.role=sessionStorage.getItem('role');
  

    this.genericDTO.pageNum=0;
    this.getPageCount();
    
    this.reloadData();
  }

  searchDrivers(){
    this.genericDTO.searchInstructor=this.searchInstructor;
    this.genericDTO.pageNum=0;
    this.drivers = this.companyService.getDriversListPage(this.genericDTO);
    this.getPageCount();
    console.log(this.drivers)
  }
  arrayOne(n: number): any[] {
    return Array(n);
  }
  getDriverList(pageNo:number){
    this.genericDTO.pageNum=pageNo;
    this.drivers = this.companyService.getDriversListPage(this.genericDTO);
  }
  getPageCount(){
    this.companyService.getTotalPages(this.genericDTO).subscribe(data=>
      {this.totalPages=Number(data),console.log("00000000000000000000000000-total pages are--"+this.totalPages)});
   
  }
  first(){
    this.genericDTO.pageNum=0;
    this.drivers = this.companyService.getDriversListPage(this.genericDTO);
  }
  prev(){
    this.genericDTO.pageNum=this.genericDTO.pageNum-1;
    if(this.genericDTO.pageNum<0){this.genericDTO.pageNum=0;}
    this.drivers = this.companyService.getDriversListPage(this.genericDTO);
  }
  next(){
    this.genericDTO.pageNum=this.genericDTO.pageNum+1;
    if(this.genericDTO.pageNum>=this.totalPages){this.genericDTO.pageNum=this.totalPages-1;}
    this.drivers = this.companyService.getDriversListPage(this.genericDTO);
  }
  last(){
      this.genericDTO.pageNum=this.totalPages-1;
      this.drivers = this.companyService.getDriversListPage(this.genericDTO);
  }
  reloadData() {
    this.drivers = this.companyService.getDriversListPage(this.genericDTO);
    this.getPageCount();
    console.log(this.drivers)
  }

  deleteDriver(id: number) {
    this.companyService.deleteDriver(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Driver has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error), this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete Driver as it is mapped with one or more Fleet Records")});
  }
}
