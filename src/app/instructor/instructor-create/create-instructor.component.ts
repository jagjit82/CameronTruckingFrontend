import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'app/common/common.service';
import { Instructor } from '../instructor';
import { InstructorService } from '../instructorservice';
import { CompanyService } from 'app/company/companyservice';

@Component({
  selector: 'app-create-instructor',
  templateUrl: './create-instructor.component.html',
  styleUrls: ['./create-instructor.component.css']
})
export class CreateInstructorComponent implements OnInit {

  instructor: Instructor = new Instructor();
  company:string;
  submitted = false;

  constructor(private router: Router,private instructorService: InstructorService,private companyService:CompanyService,private commonService :  CommonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.company=sessionStorage.getItem("company");
    this.companyService.getCompany(this.company).subscribe(data=>{
      this.instructor.company=data;
    });
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.instructorService.getInstructor(id).subscribe(data => {
        this.instructor= data;
        //this.productForm.setValue({
         // prod_name: data.prod_name,
         // prod_desc: data.prod_desc,
          //prod_price: data.prod_price
        });
      });
  }

  newInstructor(): void {
    this.submitted = false;
    this.instructor = new Instructor();
  }

  save() {
    if(this.instructor.id!=null){
      this.instructorService.updateInstructor(this.instructor)
      .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',"Hurray! "+sessionStorage.getItem('username')+" - Your Instructor has been updated successfully!."),
      this.instructor=new Instructor(),
      this.router.navigate(['/instructors']);
    }, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!.")});
  
    }else{
    this.instructorService.createInstructor(this.instructor)
    .subscribe(data => {console.log(data),
      this.commonService.showNotification('top','center',"Hurray! "+sessionStorage.getItem('username')+" - Your Instructor has been created successfully!.")
      this.router.navigate(['/instructors']);
    }, 
    error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!.")});
    //this.instructor = new Instructor();
    }
  
  }

  
  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
 