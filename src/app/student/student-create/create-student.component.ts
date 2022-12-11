
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { InstructorService } from 'app/instructor/instructorservice';
import { CommonService } from 'app/common/common.service';
import { Vehicle } from 'app/vehicle/vehicle';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
import { Student } from '../student';
import { StudentService } from '../studentservice';
import { CompanyService } from 'app/company/companyservice';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreatestudentComponent implements OnInit {

  student: Student = new Student();
  trucks: Observable<Vehicle[]>;
  submitted = false;
  company:string;
  postDiscount:number=0;
  pageNum:number=0;
  public fromClassArr:Array<number>  = [
    1,2,3,4,5,6,7
  ];
  public toClassArr:Array<number>  = [
    1,2,3,4,5,6,7
  ];

  public courses: { [key: string]:string; }[] = [
    { Name: 'Class 1 MELT', Code: 'Class 1 MELT' },
    { Name: 'Class 1 Hourly', Code: 'Class 1 Hourly' },
    { Name: 'Class 3 Short Course', Code: 'Class 3 Short Course' },
    { Name: 'Class 3 Automatic Course', Code: 'Class 3 Automatic Course' },
    { Name: 'Class 3 Extensive Course', Code: 'Class 3 Extensive Course' },
    { Name: 'Class 3 Hourly Course', Code: 'Class 3 Hourly Course' },
    { Name: 'Road Test Evaluation', Code: 'Road Test Evaluation' },
    { Name: 'Air Brake', Code: 'Air Brake' },
    ];

  public references: { [key: string]:string; }[] = [
      { Name: 'Walk In', Code: 'Walk In' },
      { Name: 'Online', Code: 'Online' },
      { Name: 'Newspaper', Code: 'Newspaper' },
      { Name: 'Friends', Code: 'Friends' },
      { Name: 'Instructors', Code: 'Instructors' },
      ];

  public paymentModes: { [key: string]:string; }[] = [
        { Name: 'Cash', Code: 'Cash' },
        { Name: 'Card', Code: 'Card' },
        { Name: 'Cheque', Code: 'Cheque' },
        ];
  
  

  constructor(private router: Router,private studentService: StudentService,private companyService:CompanyService,private instructorService:InstructorService,private truckService:VehicleService,
    private route: ActivatedRoute,private commonService:CommonService) { 
      this.route.queryParams
      .filter(params => params.page)
      .subscribe(params => {
        console.log(params); // {order: "popular"}
        this.pageNum = params.page;
        
      });
    }


  ngOnInit() {
    this.company=sessionStorage.getItem("company");
    this.companyService.getCompany(this.company).subscribe(data=>{
      this.student.company=data;
    });
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.studentService.getStudent(id).subscribe(data => {
        this.student= data;
        this.calculateNetPay();
        });
      });
    }
  newStudent(): void {
    this.submitted = false;
    this.student = new Student();
  }

  calculateNetPay():void{
    this.postDiscount=this.student.totalAmount-(this.student.totalAmount*this.student.discount/100);
  }
  
  save() {
    //this.student.status=true;
    if(this.student.id!=null){
      this.studentService.updateStudent(this.student).subscribe(data => 
        {console.log(data),this.commonService.showNotification('top','center',"Hurray! "+sessionStorage.getItem('username')+" - Your Fleet Log has been updated successfully!."),
        this.student=new Student(),
        this.router.navigate(['/students'], { queryParams:{ page: this.pageNum}});
      },
         error => 
         {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!.")});
    }else{
    this.studentService.createStudent(this.student)
    .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',"Hurray! "+sessionStorage.getItem('username')+" - Your Fleet Log has been created successfully!."),
    this.student=new Student(),
    this.router.navigate(['/students']);
  },
     error => {console.log(error),
    this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!." +error)});
    }
    
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
 