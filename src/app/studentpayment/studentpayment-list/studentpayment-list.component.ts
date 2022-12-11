import { Observable } from "rxjs";
import { StudentPayment } from "./../studentPayment";
import { Component, OnInit, Inject, Input } from "@angular/core";
import { Router } from '@angular/router';
import { StudentPaymentService } from "../studentPaymentservice";
import { environment } from "environments/environment";


@Component({
  selector: "app-studentPayment-list",
  templateUrl: "./studentPayment-list.component.html",
  styleUrls: ["./studentPayment-list.component.css"]
})
export class StudentPaymentListComponent implements OnInit {
  @Input()
  studentPayments: Observable<StudentPayment[]>;
  studentPayment:StudentPayment = new StudentPayment();
  role:string;
  company:string;
  sortField:string="id";
  config:any;
  itemPerPage:number =environment.itemsperpage;
  count:number=0;
	sortOrder:string="descending";
  constructor(private studentPaymentService: StudentPaymentService,
    private router: Router) {}

  pageNum:number=0;
  totalPages:number=0;
  

  ngOnInit() {
    this.role=sessionStorage.getItem('role');
    this.company=sessionStorage.getItem("company");
    this.pageNum=0;
    this.reloadData();
  }

  reloadData() {
    this.studentPaymentService.getTotalPages(this.company).subscribe(
      data=>{
        console.log(data);
        this.count=data;
      this.config={
        itemsPerPage: this.itemPerPage,
        currentPage: 1,
        totalItems: this.count
      };
      this.studentPayments = this.studentPaymentService.getStudentPaymentPage(this.config.currentPage,this.sortField,this.sortOrder,this.company); 
    }
    )
  }
   
  pageChanged(event){
    this.config.currentPage = event;
    this.studentPayments = this.studentPaymentService.getStudentPaymentPage(this.config.currentPage,this.sortField,this.sortOrder,this.company);
  }
  
  deleteStudentPayment(id: number) {
    this.studentPaymentService.deleteStudentPayment(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}

