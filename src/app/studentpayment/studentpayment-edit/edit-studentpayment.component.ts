
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { InstructorService } from 'app/instructor/instructorservice';
import { CommonService } from 'app/common/common.service';
import { Vehicle } from 'app/vehicle/vehicle';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
import { StudentPaymentService } from '../studentPaymentservice';
import { CompanyService } from 'app/company/companyservice';
import { StudentPayment } from '../studentpayment';
import { Student } from 'app/student/student';
import { StudentService } from 'app/student/studentservice';

@Component({
  selector: 'app-edit-studentPayment',
  templateUrl: './edit-studentPayment.component.html',
  styleUrls: ['./edit-studentPayment.component.css']
})
export class EditstudentPaymentComponent implements OnInit {
  students:Observable<Student[]>;
  studentPayment: StudentPayment = new StudentPayment();
  submitted = false;
  company:string;
  showAmount:boolean=true;
  balanceAmountService:number;
  balanceAmount:number;
  totalAmount:number;
  postDiscount:number=0;
  sortField:string="id";
	sortOrder:string="descending";
  

  constructor(private router: Router,private studentPaymentService: StudentPaymentService,private studentService:StudentService,private companyService:CompanyService,private instructorService:InstructorService,private truckService:VehicleService,
    private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
    this.company=sessionStorage.getItem("company");
    this.students = this.studentService.getStudents(this.company);
    
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.studentPaymentService.getStudentPayment(id).subscribe(data => {
        this.studentPayment= data;
        this.totalAmount=this.studentPayment.student.totalAmount-(this.studentPayment.student.totalAmount*this.studentPayment.student.discount/100);
        this.studentPaymentService.getTotalPaymentsByStudentForEdit(this.studentPayment.student.id,id).subscribe(data=>{
          this.balanceAmountService=this.totalAmount-data;
          this.balanceAmount=this.totalAmount-data-this.studentPayment.payment;
          this.balanceAmount=parseInt(this.balanceAmount.toFixed(1));
          
        });
      });
        
      });
      
    }
  

    onChange(student:Student){
      this.showAmount=true;
      this.totalAmount=student.totalAmount-(student.totalAmount*student.discount/100);
      this.studentPaymentService.getTotalPaymentsByStudent(student.id).subscribe(data=>{
        this.balanceAmountService=this.totalAmount-data-this.studentPayment.payment;
        this.balanceAmount=this.totalAmount-data-this.studentPayment.payment;
        this.balanceAmount=parseInt(this.balanceAmount.toFixed(1));
        
      });

    }
    calculateBalanceAmt(){
      this.balanceAmount=Number(this.balanceAmountService);
      this.balanceAmount=  this.balanceAmount-this.studentPayment.payment;
      this.balanceAmount=parseInt(this.balanceAmount.toFixed(1));
      
    }
  

  save() {
    //this.studentPayment.status=true;
    if(this.studentPayment.id!=null){
      this.studentPaymentService.updateStudentPayment(this.studentPayment).subscribe(data => {console.log(data),this.commonService.showNotification('top','center',"Hurray! "+sessionStorage.getItem('username')+" - Your Fleet Log has been updated successfully!."),this.studentPayment=new StudentPayment()}, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!.")});
    }else{
    this.studentPaymentService.createStudentPayment(this.studentPayment)
    .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',"Hurray! "+sessionStorage.getItem('username')+" - Your Fleet Log has been editd successfully!."),this.studentPayment=new StudentPayment()}, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!." +error)});
    this.studentPayment = new StudentPayment();
    }
    this.router.navigate(['/studentPayments']);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
 