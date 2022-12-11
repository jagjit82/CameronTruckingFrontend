import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/listVehicle', title: 'Vehicle',  icon:'local_shipping', class: 'Vehicle' },
    { path: '/instructors', title: 'Instructor',  icon: 'person', class: 'instructor' },
    { path: '/students', title: 'Student',  icon:'person', class: 'student' },
    { path: '/employees', title: 'Employee',  icon:'person', class: 'employees' },
    { path: '/tests', title: 'Exam',  icon:'library_books', class: 'exam' },
    { path: '/message', title: 'Message',  icon:'email', class: 'message' },
    { path: '/companyDetails', title: 'Company',  icon:'business', class: 'companydetails' },
    { path: '/phoneLogs', title: 'Phone',  icon:'phone', class: 'phone' },
    { path: '/activityLogs', title: 'Activity',  icon:'menu_book', class: 'activity' },
    { path: '/expenses', title: 'Expense & Income',  icon:'account_balance', class: 'expense' },
    
    
    
    // { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: 'dashboard' },
    // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    // { path: '/table-list', title: 'Tables',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icona',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notificatoions',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  user:string;
  role:string;
  company:string =  sessionStorage.getItem("company");
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.user=sessionStorage.getItem('username');
    this.role=sessionStorage.getItem('role');
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
