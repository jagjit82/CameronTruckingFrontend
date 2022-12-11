import { Observable } from "rxjs";
import { Instructor } from "../instructor";
import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { InstructorService } from "../instructorservice";


@Component({
  selector: "app-instructor-view",
  templateUrl: "./instructor-view.component.html",
  styleUrls: ["./instructor-view.component.css"]
})
export class InstructorViewComponent implements OnInit {
  instructor: Instructor = new Instructor();
  modifiedByUser:string;
  constructor(private instructorService: InstructorService,
    private route: ActivatedRoute,
 ) {
      
    }

    
  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.instructorService.getInstructor(id).subscribe(data => {
        this.instructor= data;
        });
      });
    
  }

  reloadData() {
    
  }
  
  
}
