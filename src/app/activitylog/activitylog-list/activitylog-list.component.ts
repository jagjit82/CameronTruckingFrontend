import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { ActivityLog } from "../activitylog";
import { ActivityLogService } from "../service/activitylog.service";

@Component({
  selector: "app-ActivityLog-list",
  templateUrl: "./activitylog-list.component.html",
  styleUrls: ["./activitylog-list.component.css"],
  providers:[ActivityLogService]
})
export class ActivityLogListComponent implements OnInit {
  activityLogs: Observable<ActivityLog[]>;
  ActivityLog:ActivityLog;
  company:string=sessionStorage.getItem("company");
  //items: any[] = [];
  constructor(private ActivityLogService: ActivityLogService,private commonService:CommonService,
    private router: Router) {}

  ngOnInit() {
    //this.role=sessionStorage.getItem('role');
    //this.getPageCount();
    this.reloadData();
    
  }

  
  reloadData() {
    this.ActivityLogService.getactivityLogsListPage(this.company).subscribe(
      data=>{
        this.activityLogs=data;
      }
    );
    //this.getPageCount();
    //this.activityLogs.forEach(element => {this.items.push(element)});
    
  }
  deleteActivityLog(id: number) {
    this.ActivityLogService.deleteactivityLog(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Activity Log has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete ActivityLog as it is mapped with one or more Fleet Records")});
  }
}
  