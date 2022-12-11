import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common/common.service';

import { CompanyService } from 'app/company/companyservice';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
import { Vehicle } from 'app/vehicle/vehicle';
import { InstructorService } from 'app/instructor/instructorservice';
import { Instructor } from 'app/instructor/instructor';
import { GenericDTO } from 'app/common/genericDTO';
import { Message } from '../message';
import { MessageService } from '../service/message.service';
import { EmployeeService } from 'app/employee/employee.service';
import { Employee } from 'app/employee/employee';
declare var $: any;
@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})
export class CreateMessageComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  message: Message = new Message();
  company:string=sessionStorage.getItem("company");
  validatemessage: Message = new Message();
  originalmessage:Message = new Message();
  employees: Observable<Employee[]>;
  submitted = false;
  public categories: { [key: string]:string; }[] = [
    { Name: 'Inventory', Code: 'Inventory' },
    { Name: 'Finanace', Code: 'Finance' },
    { Name: 'Software', Code: 'Software' },
    { Name: 'Test', Code: 'Test' },
    { Name: 'Others', Code: 'Others' },
    ];

  constructor(private router: Router,private instructorService: InstructorService,private messageService: MessageService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService,private employeeService:EmployeeService) { }

  ngOnInit() {
    this.employees = this.employeeService.getEmployeesList(this.company);
    this.employeeService.findByUser(this.user).subscribe(data=>{
      this.message.sender=data;
    });
    this.company=sessionStorage.getItem("company");
    this.companyService.getCompany(this.company).subscribe(data=>{
      this.message.company=data;
    });
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.messageService.getmessage(id).subscribe(data => {
        this.message= data;
        });
      });
 
  
  }

      
  onMessageSelection(){
    console.log("--"+this.message.id);
  }
  
  save() {
    this.messageService.createmessage(this.message)
     .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+", Message has been sent successfully!."),this.message=new Message()
      ;this.router.navigate(['/messages']);
    }, error => {console.log(error),
      this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)});
     
  
    }
    //this.message = new message();
  

  
  onSubmit() {
    this.save();
  }
  
}
 