import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { Message } from "../message";
import { MessageService } from "../service/message.service";
import { Employee } from "app/employee/employee";
import { EmployeeService } from "app/employee/employee.service";
import { environment } from "environments/environment";

@Component({
  selector: "app-Message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"],
  providers:[MessageService]
})
export class MessageListComponent implements OnInit {
  messages: Observable<Message[]>;
  modalViewMessages: Observable<Message[]>;
  message:Message;
  totalPages:number=0;
  config:any;
  sortField:string="id";
  sortOrder:string="descending";
  count:number=0;
  itemPerPage:number =environment.itemsperpage;
  replyMess:Message=new Message();
  sender:Employee=new Employee();
  modalMess:Message=new Message();
  company:string=sessionStorage.getItem("company");
  loginUser:Employee;
  userName:string=sessionStorage.getItem("username");
  //items: any[] = [];
  constructor(private messageService: MessageService,private commonService:CommonService,
    private router: Router,private employeeService:EmployeeService) {}

  ngOnInit() {
    //this.role=sessionStorage.getItem('role');
    //this.getPageCount();
    this.employeeService.findByUser(this.userName).subscribe(data=>{
      this.loginUser=data;
    });
    this.replyMess.sender=this.sender;
    this.replyMess.receiver=this.sender;
    this.modalMess.sender=this.sender;
    this.modalMess.receiver=this.sender;
    this.reloadData();
    
  }

  readMessage(mess:Message){
    this.modalMess=mess;
    this.messageService.getMessagesById(mess.id).subscribe(
      data=>{
        this.modalViewMessages=data;
      }
    );
    if(mess.status=="UNREAD"){
      mess.status="READ";
      this.messageService.updatemessage(mess).subscribe(
      data=>{
        console.log();
      }
    );
  }
  }

  replyMessage(mess:Message){
    this.replyMess=Object.assign({},mess);
    //this.replyMess=mess;
    //this.replyMess.sender=mess.receiver;
    this.replyMess.receiver=mess.sender;
    this.replyMess.sender=this.loginUser;
    this.replyMess.body="";
    this.replyMess.referenceId=mess.id;
    this.replyMess.id=0;
  }

  sendReply(){
    this.messageService.createmessage(this.replyMess).subscribe(
      data=>{
        this.reloadData();
      }
    );
    this.messageService.updateStatusMessage(this.replyMess.referenceId).subscribe(
      data=>{
        this.reloadData();
      }
    );
    
  }

  pageChanged(event){
    this.config.currentPage = event;
    this.messageService.getmessages(event,this.sortField,this.sortOrder,this.company).subscribe(
      data=>{
        this.messages=data;
      });
  }
  reloadData() {
    this.messageService.getTotalPages(this.company).subscribe(data=>{
    this.config={
      itemsPerPage: this.itemPerPage,
      currentPage: 1,
      totalItems: data
    };
    this.messageService.getmessages(this.config.currentPage,this.sortField,this.sortOrder,this.company).subscribe(
      data=>{
        this.messages=data;
      }
    );
    });
    //this.getPageCount();
    //this.messages.forEach(element => {this.items.push(element)});
    
  }
  deleteMessage(id: number) {
    this.messageService.deletemessage(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Message has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete Message as it is mapped with one or more Fleet Records")});
  }
}
  