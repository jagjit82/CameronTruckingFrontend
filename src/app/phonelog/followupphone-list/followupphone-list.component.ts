import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { FollowUpPhone } from "../followupphone";
import { PhoneLogService } from "../service/phonelog.service";

@Component({
  selector: "app-FollowUpPhone-list",
  templateUrl: "./followupphone-list.component.html",
  styleUrls: ["./followupphone-list.component.css"],
  providers:[PhoneLogService]
})
export class FollowUpPhoneListComponent implements OnInit {
  followUpPhones: Observable<FollowUpPhone[]>;
  role:string;
  FollowUpPhone:FollowUpPhone;
  company:string=sessionStorage.getItem("company");
  //items: any[] = [];
  pageNum:number=0;
  totalPages:number=0;
  sortField:string="id";
  phoneLogId:number;
	sortOrder:string="descending";
  constructor(private phoneLogService: PhoneLogService,private route: ActivatedRoute,private commonService:CommonService,
    private router: Router) {}

  ngOnInit() {
    //this.role=sessionStorage.getItem('role');
    this.pageNum=0;
    var id = this.route.params.subscribe(params => {
      this.phoneLogId = params['id'];
    });
    //this.getPageCount();
    this.reloadData();
    
  }

  sortById(){
    this.sortField="id";
    if(this.sortOrder==="ascending"){
      this.sortOrder="descending";
    }else{
      this.sortOrder="ascending";
    }
    //this.followUpPhones = this.FollowUpPhoneService.getFollowUpPhonesListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  sortByFollowUpPhoneNum(){
    console.log("inside table header")
    this.sortField="FollowUpPhoneNum";
    if(this.sortOrder==="ascending"){
      this.sortOrder="descending";
    }else{
      this.sortOrder="ascending";
    }
    //this.followUpPhones = this.FollowUpPhoneService.getFollowUpPhonesListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  arrayOne(n: number): any[] {
    return Array(n);
  }
  getFollowUpPhoneList(pageNo:number){
    this.pageNum=pageNo;
   // this.followUpPhones = this.FollowUpPhoneService.getFollowUpPhonesListPage(pageNo,this.sortField,this.sortOrder);
  }
  

  //  transform() {
  //   let keyArr: any[] = Object.keys(this.items[0]),
  //     dataArr = [];
  //     var i=0;
  //     keyArr.forEach((key: any) => {
  //       dataArr.push(this.items[0][key]);
  //     });
  //   return dataArr;
  // }
   first(){
    this.pageNum=0;
    //this.followUpPhones = this.FollowUpPhoneService.getFollowUpPhonesListPage(this.pageNum,this.sortField,this.sortOrder);
   }
  prev(){
    this.pageNum=this.pageNum-1;
    if(this.pageNum<0){this.pageNum=0;}
    //this.followUpPhones = this.FollowUpPhoneService.getFollowUpPhonesListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  next(){
    this.pageNum=this.pageNum+1;
    if(this.pageNum>=this.totalPages){this.pageNum=this.totalPages-1;}
    //this.followUpPhones = this.FollowUpPhoneService.getFollowUpPhonesListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  last(){
      this.pageNum=this.totalPages-1;
      //this.followUpPhones = this.FollowUpPhoneService.getFollowUpPhonesListPage(this.pageNum,this.sortField,this.sortOrder);
  }
   

  reloadData() {
    this.sortField="id";
    this.sortOrder="descending";
    this.phoneLogService.getfollowUpPhoneListPage(this.phoneLogId,this.company).subscribe(
      data=>{
        this.followUpPhones=data;
      }
    );
    //this.getPageCount();
    //this.followUpPhones.forEach(element => {this.items.push(element)});
    
  }
  deleteFollowUpPhoneLog(id: number) {
    this.phoneLogService.deletefollowUpPhone(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Instructor Training has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete FollowUpPhone as it is mapped with one or more Fleet Records")});
  }
}
  