import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';

import { AdminLayoutRoutes } from 'app/layouts/admin-layout/admin-layout.routing';
import { InstructorService } from 'app/instructor/instructorservice';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
import { StudentPaymentService } from 'app/studentpayment/studentPaymentservice';
import { Observable } from 'rxjs';
import { Navbar } from './navbar';
import { CompanyService } from 'app/company/companyservice';
import { EmployeeService } from 'app/employee/employee.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    private listSubTitles: any[];
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    countStudentPaymentReminders:Observable<object>;
    countVehicleCvipInsuranceExpFields:Observable<object>;
    countCompanyDetailsExpiry:Observable<object>;
    countInstructorExpiry:Observable<object>;
    countApprovals:Observable<Object>;
    company:string=sessionStorage.getItem("company");
    countTransportLicenseExpiryRec:number=0;
    countNonTransportLicenseExpiryRec:number=0;
    notificationList:Array<Navbar>=[];


    constructor(location: Location,  private element: ElementRef, private router: Router,
        private studentPaymentService: StudentPaymentService,private instructorService:InstructorService,
        private companyService: CompanyService,
        private vehicleService: VehicleService,private emplService:EmployeeService) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      this.listSubTitles=AdminLayoutRoutes.filter(listSubTitle=>listSubTitle)
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
    this.studentPaymentService.countStudentReminderRecords(this.company).subscribe(data=>{
        this.countStudentPaymentReminders=data;
        if(Number(this.countStudentPaymentReminders)>0){
            let navbar= new Navbar();
            navbar.displayName="Student Payment Reminder";
            navbar.route="/studentPaymentReminder";
            this.notificationList.push(navbar);
            navbar.count=Number(this.countStudentPaymentReminders);
        }
    });
    this.vehicleService.countVehiclesCvipAndPlateExpiry(this.company).subscribe(data=>{
        this.countVehicleCvipInsuranceExpFields=data;
        if(Number(this.countVehicleCvipInsuranceExpFields)>0){
            let navbar= new Navbar();
            navbar.displayName="Vehicle Expiry Reminder";
            navbar.route="/vehicleExpiryNotifications";
            this.notificationList.push(navbar);
            navbar.count=Number(this.countVehicleCvipInsuranceExpFields);
        }
    });
    this.emplService.countApprovals().subscribe(data=>{
        this.countApprovals=data;
        if(Number(this.countApprovals)>0){
            let navbar= new Navbar();
            navbar.displayName="Pending Approvals";
            navbar.route="/pendingApprovals";
            this.notificationList.push(navbar);
            navbar.count=Number(this.countApprovals);
        }
    });
    this.instructorService.countInstructorExpiryReminder(this.company).subscribe(data=>{
        this.countInstructorExpiry=data;
        if(Number(this.countInstructorExpiry)>0){
            let navbar= new Navbar();
            navbar.displayName="Instructor Expiry Details";
            navbar.route="/instructorExpiryNotifications";
            this.notificationList.push(navbar);
            navbar.count=Number(this.countInstructorExpiry);
        }
    });

    this.companyService.countCompanyReminder(this.company).subscribe(data=>{
        this.countCompanyDetailsExpiry=data;
        if(Number(this.countCompanyDetailsExpiry)>0){
            let navbar= new Navbar();
            navbar.displayName="Company Expiry Details";
            navbar.route="/companyExpiryNotifications";
            this.notificationList.push(navbar);
            navbar.count=Number(this.countCompanyDetailsExpiry);
        }
    });

    // this.truckService.countP\ermitRecords().subscribe(data=>{this.countPermitExpiryRec=data});
    // this.truckService.countFitnessRecords().subscribe(data=>{this.countFitnessExpiryRec=data});
    // this.instructorService.countTransportLicExpRecords().subscribe(data=>{this.countTransportLicenseExpiryRec=data});
    // this.instructorService.countNonTransportLicExpRecords().subscribe(data=>{this.countNonTransportLicenseExpiryRec=data});
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      var returnVal="";
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
    //   titlee = titlee.slice( 1 );
    //   for(var item = 0; item < this.listSubTitles.length; item++){
    //     if(this.listSubTitles[item].path === titlee){
    //         returnVal = this.listSubTitles[item].path;
    //         return returnVal;
    //     }
    // }
      return '';
    }
}
