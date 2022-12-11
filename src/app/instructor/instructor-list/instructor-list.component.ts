import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { GenericDTO } from "app/common/genericDTO";
import { Instructor } from "../instructor";
import { InstructorService } from "../instructorservice";
import { environment } from "environments/environment";

@Component({
  selector: "app-instructor-list",
  templateUrl: "./instructor-list.component.html",
  styleUrls: ["./instructor-list.component.css"]
})
export class InstructorListComponent implements OnInit {
  instructors: Observable<Instructor[]>;
  role:string;
  pageNum:number=0;
  totalPages:number=0;
  searchInstructor:string;
  config:any;
  count:number=0;
  sortField="id";
  sortOrder="descending";
  itemPerPage:number =environment.itemsperpage;
  company:string=sessionStorage.getItem("company");
  genericDTO:GenericDTO= new GenericDTO();

  constructor(private instructorService: InstructorService,private commonService:CommonService,
    private router: Router) {}

  ngOnInit() {
    this.role=sessionStorage.getItem('role');
  

    this.genericDTO.pageNum=0;
    this.getPageCount();
    
    this.reloadData();
  }

  searchInstructors(){
    
    this.genericDTO.pageNum=0;
    this.genericDTO.searchInstructor=this.searchInstructor;
    this.genericDTO.company=this.company;
    this.instructors = this.instructorService.getInstructorsListPage(this.genericDTO);
    this.getPageCount();
    console.log(this.instructors)
  }
  arrayOne(n: number): any[] {
    return Array(n);
  }
  getInstructorList(pageNo:number){
    this.genericDTO.pageNum=pageNo;
    this.instructors = this.instructorService.getInstructorsListPage(this.genericDTO);
  }
  getPageCount(){
    this.instructorService.getTotalPages(this.genericDTO).subscribe(data=>
      {this.totalPages=Number(data),console.log("00000000000000000000000000-total pages are--"+this.totalPages)});
   
  }

  pageChanged(event){
    this.config.currentPage = event;
    this.instructorService.getInstructors(event,this.sortField,this.sortOrder,this.company).subscribe(data=>{
      this.instructors = data;
    })
  }

  reloadData() {
    this.instructorService.getTotalPageCount(this.company).subscribe(data=>{
    this.config={
      itemsPerPage: this.itemPerPage,
      currentPage: 1,
      totalItems: data
    };
    this.instructorService.getInstructors(this.config.currentPage,this.sortField,this.sortOrder,this.company).subscribe(data=>{
      this.instructors = data;
    })
    });
  }
    

  deleteInstructor(id: number) {
    this.instructorService.deleteInstructor(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Instructor has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error), this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete Instructor as it is mapped with one or more Fleet Records")});
  }
}
