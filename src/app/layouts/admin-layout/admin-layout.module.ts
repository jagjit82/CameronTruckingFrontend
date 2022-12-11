import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  
} from '@angular/material';
import { StudentViewComponent } from 'app/student/student-view/student-view.component';
import { StudentListComponent } from 'app/student/student-list/student-list.component';
import { CreateEmployeeComponent } from 'app/employee/create-employee/create-employee.component';
import { EmployeeListComponent } from 'app/employee/employee-list/employee-list.component';
import { LogoutComponent } from 'app/logout/logout.component';

import { CompanyListComponent } from 'app/company/company-list/company-list.component';
import { CreatevehicleComponent } from 'app/vehicle/create-vehicle/create-vehicle.component';
import { VehicleListComponent } from 'app/vehicle/vehicle-list/vehicle-list.component';
import { VehicleSearchListComponent } from 'app/vehicle/vehiclesearch-list/vehiclesearch-list.component';
import { EditVehicleComponent } from 'app/vehicle/vehicle-edit/edit-vehicle.component';
import { VehicleViewComponent } from 'app/vehicle/vehicle-view/vehicle-view.component';
import { CreateInstructorComponent } from 'app/instructor/instructor-create/create-instructor.component';
import { InstructorListComponent } from 'app/instructor/instructor-list/instructor-list.component';
import { InstructorViewComponent } from 'app/instructor/instructor-view/instructor-view.component';
import { CreatestudentComponent } from 'app/student/student-create/create-student.component';
import { EmployeeViewComponent } from 'app/employee/employee-view/employee-view.component';
import { CreatevehicleLogComponent } from 'app/vehiclelog/create-vehiclelog/create-vehiclelog.component';
import { VehicleLogListComponent } from 'app/vehiclelog/vehiclelog-list/vehiclelog-list.component';
import { EditvehicleLogComponent } from 'app/vehiclelog/edit-vehiclelog/edit-vehiclelog.component';
import { CreateDieselLogComponent } from 'app/diesellog/create-diesellog/create-diesellog.component';
import { EditdieselLogComponent } from 'app/diesellog/edit-diesellog/edit-diesellog.component';
import { DieselLogListComponent } from 'app/diesellog/diesellog-list/diesellog-list.component';
import { CreateInstructorMonitoringComponent } from 'app/instructormonitor/create-instructormonitoring/create-instructormonitoring.component';
import { EditinstructorMonitoringComponent } from 'app/instructormonitor/edit-instructormonitoring/edit-instructormonitoring.component';
import { InstructorMonitoringListComponent } from 'app/instructormonitor/instructormonitoring-list/instructormonitoring-list.component';
import { InstructorTrainingListComponent } from 'app/instructortraining/instructortraining-list/InstructorTraining-list.component';
import { CreateInstructorTrainingComponent } from 'app/instructortraining/create-instructortraining/create-instructortraining.component';
import { EditinstructorTrainingComponent } from 'app/instructortraining/edit-instructortraining/edit-InstructorTraining.component';
import { CreatePhoneLogComponent } from 'app/phonelog/create-phonelog/create-phonelog.component';
import { PhoneLogListComponent } from 'app/phonelog/phonelog-list/phonelog-list.component';
import { CreateRemindersComponent } from 'app/reminders/create-reminders/create-reminderscomponent';
import { CreatestudentPaymentComponent } from 'app/studentpayment/studentpayment-create/create-studentpayment.component';
import { StudentPaymentListComponent } from 'app/studentpayment/studentpayment-list/studentpayment-list.component';
import { EditstudentPaymentComponent } from 'app/studentpayment/studentpayment-edit/edit-studentpayment.component';
import { StudentPaymentListReminderComponent } from 'app/studentpayment/studentpayment-reminder/studentpayment-reminder.component';
import { VehicleExpiryNotificationsComponent } from 'app/vehicle/vehicleexpiry-notifications/vehicleexpirynotifications.component';
import { CreateCompanyDetailsComponent } from 'app/companydetails/create-companydetails/create-companydetails.component';
import { CompanyDetailsExpiryNotificationsComponent } from 'app/companydetails/companydetailsexpiry-notifications/companydetailsexpirynotifications.component';
import { InstructorExpiryListComponent } from 'app/instructor/instructorexpiry-list/instructorexpiry-list.component';
import { FollowUpPhoneListComponent } from 'app/phonelog/followupphone-list/followupphone-list.component';
import { CreateFollowUpPhoneComponent } from 'app/phonelog/create-followupphone/create-followphone.component';
import { CreatestudentResultComponent } from 'app/studentresult/studentresult-create/create-studentresult.component';
import { StudentResultListComponent } from 'app/studentresult/studentresult-list/studentresult-list.component';
import { ApprovalNotificationsComponent } from 'app/ApprovalNotifications/approvalsnotifications.component';
import { ApprovalStudResultComponent } from 'app/ApprovalStudResult/approvalstudResult.component';
import { ApprovalStudentPaymentComponent } from 'app/ApprovalStudPayments/approvalstudentpayment.component';
import { ApprovalStudentComponent } from 'app/ApprovalStudent/approvalstudent.component';
import { EmployeehourLogListComponent } from 'app/employeehourlog/employeehourlog-list/employeehourlog-list.component';
import { CreateEmployeeHourLogComponent } from 'app/employeehourlog/employeehourlog-create/create-employeehourlog.component';
import { ApprovalDieselLogComponent } from 'app/ApprovalDieselLog/approvaldiesellog.component';
import { ApprovalVehicleLogComponent } from 'app/ApprovalVehicleLog/approvalvehiclelog.component';
import { ApprovalVehicleComponent } from 'app/ApprovalVehicle/approvalvehicle.component';
import { StudentCourseListComponent } from 'app/studentcourse/studentcourse-list/studentcourse-list.component';
import { CreatestudentCourseComponent } from 'app/studentcourse/studentcourse-create/create-studentcourse.component';
import { CreatestudentLogComponent } from 'app/studentlog/studentlog-create/create-studentlog.component';
import { StudentLogListComponent } from 'app/studentlog/studentlog-list/studentlog-list.component';
import { CreateInstructorLogComponent } from 'app/instructorlog/create-instructorlog/create-instructorlog.component';
import { InstructorLogListComponent } from 'app/instructorlog/instructorlog-list/InstructorLog-list.component';
import { CreateActivityLogComponent } from 'app/activitylog/create-activitylog/create-activitylog.component';
import { ActivityLogListComponent } from 'app/activitylog/activitylog-list/ActivityLog-list.component';
import { CreateMessageComponent } from 'app/message/create-message/create-message.component';
import { MessageListComponent } from 'app/message/message-list/message-list.component';
import { CreateTestComponent } from 'app/Test/create-test/create-test.component';
import { TestListComponent } from 'app/Test/test-list/test-list.component';
import { CreateQuestionComponent } from 'app/question/create-question/create-question.component';
import { QuestionListComponent } from 'app/question/question-list/question-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CreateExpenseComponent } from 'app/Expense/create-expense/create-expense.component';
import { ExpenseListComponent } from 'app/Expense/expense-list/expense-list.component';
import { ExpenseLogListComponent } from 'app/expenselog/expenselog-list/expenselog-list.component';
import { CreateExpenseLogComponent } from 'app/expenselog/create-expenselog/create-expenselog.component';
import { TestResultListComponent } from 'app/Exam/testresult-list/testresult-list.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDatepickerModule, MatInputModule,MatNativeDateModule,
    NgxPaginationModule
    
  ],
  declarations: [
    DashboardComponent,
    CreatevehicleComponent,
    VehicleListComponent,
    VehicleSearchListComponent,
    StudentViewComponent,
    CreateInstructorComponent,
    InstructorLogListComponent,
    InstructorListComponent,
    CreatestudentComponent,
    CompanyListComponent,
    StudentListComponent,
    InstructorViewComponent,
    CreateInstructorLogComponent,
    VehicleExpiryNotificationsComponent,
    CreateCompanyDetailsComponent,
    CreateTestComponent,
    TestListComponent,
    CreateQuestionComponent,
    QuestionListComponent,
    CreateEmployeeComponent,
    CreatestudentResultComponent,
    CreateMessageComponent,
    MessageListComponent,
    StudentResultListComponent,
    ApprovalNotificationsComponent,
    ApprovalVehicleComponent,
    StudentCourseListComponent,
    CreatestudentCourseComponent,
    CreateActivityLogComponent,
    ActivityLogListComponent,
    CreatestudentLogComponent,
    StudentLogListComponent,
    LogoutComponent,
    ExpenseLogListComponent,
    CreateExpenseLogComponent,
    ApprovalStudResultComponent,
    ApprovalStudentPaymentComponent,
    ApprovalStudentComponent,
    EmployeehourLogListComponent,
    CreateEmployeeHourLogComponent,
    ApprovalDieselLogComponent,
    ApprovalVehicleLogComponent,
    CreateExpenseComponent,
    TestResultListComponent,
    ExpenseListComponent,
    EditVehicleComponent,
    FollowUpPhoneListComponent,
    CreateFollowUpPhoneComponent,
    EmployeeListComponent,
    CreatevehicleLogComponent,
    EmployeeViewComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    UpgradeComponent,
    VehicleViewComponent,
    VehicleLogListComponent,
    EditvehicleLogComponent,
    CreateDieselLogComponent,
    EditdieselLogComponent,
    DieselLogListComponent,
    CreateInstructorMonitoringComponent,
    InstructorExpiryListComponent,
    EditinstructorMonitoringComponent,
    InstructorMonitoringListComponent,
    InstructorTrainingListComponent,
    CreateInstructorTrainingComponent,
    EditinstructorTrainingComponent,
    CreatePhoneLogComponent,
    PhoneLogListComponent,
    StudentPaymentListReminderComponent,
    CreateRemindersComponent,
    CreatestudentPaymentComponent,
    StudentPaymentListComponent,
    EditstudentPaymentComponent,
    CompanyDetailsExpiryNotificationsComponent,
    
  ],
  
  
})

export class AdminLayoutModule {}
