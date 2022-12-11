import { EmployeeService } from './../employee.service';
import { Employee } from './../employee';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/common/common.service';
import { CompanyService } from 'app/company/companyservice';
import { ActivatedRoute, Router } from '@angular/router';
interface TestObject {
  name:string;
  value:String;
}
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  objArray:TestObject[] = [{name: 'ROLE_ADMIN', value: "ROLE_ADMIN"}, {name: 'ROLE_USER', value: 'ROLE_USER'},, {name: 'ROLE_SUPER', value: 'ROLE_SUPER'}];
  employee: Employee = new Employee();
  origEmployee: Employee = new Employee();
  company:string;
  editUsername:string;
  validateEmp:Employee = new Employee();
  submitted = false;

  constructor(private router: Router, private route: ActivatedRoute,private employeeService: EmployeeService,private companyService:CompanyService,private commonService:CommonService) { }

  ngOnInit() {
    this.company=sessionStorage.getItem("company");
    this.companyService.getCompany(this.company).subscribe(data=>{
      this.employee.company=data;
    });
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.employeeService.getEmployee(id).subscribe(data => {
        this.employee= data;
        this.editUsername=this.employee.userName;
        });
      });
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  save() {
    if(this.employee.id!=null){
      this.employeeService.updateEmployee(this.employee)
      .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+" - Employee has been updated successfully!."),this.employee=new Employee()}, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!." +error)});
    }else{
      this.employeeService.createEmployee(this.employee)
      .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+" - User has been created successfully!."),this.employee=new Employee()}, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!." +error)});
    
    }
    this.router.navigate(['/employees']);
   }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  validateUser(){
    this.employeeService.validateUser(this.employee.userName)
    .subscribe(data => {this.validateEmp=data;
      console.log("this.validateEmp.userName-"+this.validateEmp.userName);
      console.log("this.employee.userName-"+this.employee.userName);
      if(this.employee.id && (this.validateEmp.userName!=this.editUsername)){
        this.commonService.showErrorNotification('top','center',"Username "+this.validateEmp.userName+ "  already exists.Please choose a different one !!"),
        this.employee.userName=null;
      }else if(this.employee.id==null && this.validateEmp.userName){
        this.commonService.showErrorNotification('top','center',"Username "+this.validateEmp.userName+ "  already exists.Please choose a different one !!"),
        this.employee.userName=null;
      }
      }, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!." +error)
    });
    }
    
}
