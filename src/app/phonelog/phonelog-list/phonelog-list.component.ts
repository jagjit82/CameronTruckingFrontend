import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { PhoneLog } from "../phonelog";
import { PhoneLogService } from "../service/phonelog.service";
import { environment } from "environments/environment";
import { PhoneLogSearch } from "../phonelogSearch";

@Component({
  selector: "app-PhoneLog-list",
  templateUrl: "./phonelog-list.component.html",
  styleUrls: ["./phonelog-list.component.css"],
  providers:[PhoneLogService]
})
export class PhoneLogListComponent implements OnInit {
  phoneLogs: Observable<PhoneLog[]>;
  role:string;
  phoneLog: PhoneLogSearch = new PhoneLogSearch();
  company:string=sessionStorage.getItem("company");
  //items: any[] = [];
  config:any;
  pageNum:number=1;
  itemPerPage:number =environment.itemsperpage;
  
  public callerTypeLs: { [key: string]:string; }[] = [
    { Name: 'General', Code: 'General' },
    { Name: 'Student', Code: 'Student' },
    ];
    
    public statusLs: { [key: string]:string; }[] = [
      { Name: 'OPEN', Code: 'OPEN' },
      { Name: 'CLOSED', Code: 'CLOSED' },
      ];

  constructor(private phoneLogService: PhoneLogService,private commonService:CommonService,
    private router: Router,private route:ActivatedRoute) {
      this.route.queryParams
      .filter(params => params.page)
      .subscribe(params => {
        console.log(params); // {order: "popular"}

        this.pageNum = params.page;
        
      });

    }

  ngOnInit() {
        //this.role=sessionStorage.getItem('role');
    this.phoneLog.company=this.company;
    //this.getPageCount();
    this.reloadData();
    
  }

  
  arrayOne(n: number): any[] {
    return Array(n);
  }
  getPhoneLogList(pageNo:number){
    this.pageNum=pageNo;
   // this.phoneLogs = this.PhoneLogService.getPhoneLogsListPage(pageNo,this.sortField,this.sortOrder);
  }
  

  pageChanged(event){
    this.config.currentPage = event;
    this.phoneLog.pageNumber=event;
    this.phoneLogService.searchPhoneLogs(this.phoneLog).subscribe(
      data=>{
        this.phoneLogs=data;
      }
    );
  }

  reloadData() {
    this.phoneLogService.getTotalPages(this.company).subscribe(data=>{
    this.config={
      itemsPerPage: this.itemPerPage,
      currentPage: this.pageNum,
      totalItems: data
    };

    this.phoneLog.pageNumber=this.pageNum;
    this.phoneLogService.searchPhoneLogs(this.phoneLog).subscribe(
      data=>{
        this.phoneLogs=data;
      }
    );
  });
    //this.getPageCount();
    //this.phoneLogs.forEach(element => {this.items.push(element)});
    
  }
  deletePhoneLog(id: number) {
    this.phoneLogService.deletephoneLog(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Instructor Training has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete PhoneLog as it is mapped with one or more Fleet Records")});
  }

  searchPhoneLog(){
    this.phoneLog.company=this.company;
    this.phoneLog.pageNumber=0;
    this.phoneLogService.searchPhoneLogCount(this.phoneLog).subscribe(
      data=>{
        this.config={
          itemsPerPage: this.itemPerPage,
          currentPage: 1,
          totalItems: data
        };
      }
    );
    this.phoneLogService.searchPhoneLogs(this.phoneLog).subscribe(
      data=>{
        this.phoneLogs=data;
              }
    );
    
    
  }
  reset(){
    this.phoneLog=new PhoneLogSearch();
  }
}
  