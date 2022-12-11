import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';

import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AuthGaurdService } from 'app/authorization/auth-gaurd.service';
import { StudentListComponent } from 'app/student/student-list/student-list.component';
import { StudentViewComponent } from 'app/student/student-view/student-view.component';
import { EmployeeListComponent } from 'app/employee/employee-list/employee-list.component';
import { CreateEmployeeComponent } from 'app/employee/create-employee/create-employee.component';
import { LogoutComponent } from 'app/logout/logout.component';

import { VehicleSearchListComponent } from 'app/vehicle/vehiclesearch-list/vehiclesearch-list.component';
import { CreatevehicleComponent } from 'app/vehicle/create-vehicle/create-vehicle.component';
import { VehicleListComponent } from 'app/vehicle/vehicle-list/vehicle-list.component';
import { VehicleViewComponent } from 'app/vehicle/vehicle-view/vehicle-view.component';
import { CreateInstructorComponent } from 'app/instructor/instructor-create/create-instructor.component';
import { InstructorListComponent } from 'app/instructor/instructor-list/instructor-list.component';
import { InstructorViewComponent } from 'app/instructor/instructor-view/instructor-view.component';
import { CreatestudentComponent } from 'app/student/student-create/create-student.component';
import { EmployeeViewComponent } from 'app/employee/employee-view/employee-view.component';
import { CreatevehicleLogComponent } from 'app/vehiclelog/create-vehiclelog/create-vehiclelog.component';
import { VehicleLogListComponent } from 'app/vehiclelog/vehiclelog-list/vehiclelog-list.component';
import { EditvehicleLogComponent } from 'app/vehiclelog/edit-vehiclelog/edit-vehiclelog.component';
import { DieselLogListComponent } from 'app/diesellog/diesellog-list/diesellog-list.component';
import { CreateDieselLogComponent } from 'app/diesellog/create-diesellog/create-diesellog.component';
import { EditdieselLogComponent } from 'app/diesellog/edit-diesellog/edit-diesellog.component';
import { EditinstructorMonitoringComponent } from 'app/instructormonitor/edit-instructormonitoring/edit-instructormonitoring.component';
import { InstructorMonitoringListComponent } from 'app/instructormonitor/instructormonitoring-list/instructormonitoring-list.component';
import { CreateInstructorMonitoringComponent } from 'app/instructormonitor/create-instructormonitoring/create-instructormonitoring.component';
import { CreateInstructorTrainingComponent } from 'app/instructortraining/create-instructortraining/create-instructortraining.component';
import { InstructorTrainingListComponent } from 'app/instructortraining/instructortraining-list/InstructorTraining-list.component';
import { EditinstructorTrainingComponent } from 'app/instructortraining/edit-instructortraining/edit-InstructorTraining.component';
import { CreatePhoneLogComponent } from 'app/phonelog/create-phonelog/create-phonelog.component';
import { PhoneLogListComponent } from 'app/phonelog/phonelog-list/phonelog-list.component';
import { CreateRemindersComponent } from 'app/reminders/create-reminders/create-reminderscomponent';
import { StudentPaymentListComponent } from 'app/studentpayment/studentpayment-list/studentpayment-list.component';
import { CreatestudentPaymentComponent } from 'app/studentpayment/studentpayment-create/create-studentpayment.component';
import { EditstudentPaymentComponent } from 'app/studentpayment/studentpayment-edit/edit-studentpayment.component';
import { StudentPaymentListReminderComponent } from 'app/studentpayment/studentpayment-reminder/studentpayment-reminder.component';
import { VehicleExpiryNotificationsComponent } from 'app/vehicle/vehicleexpiry-notifications/vehicleexpirynotifications.component';
import { CreateCompanyDetailsComponent } from 'app/companydetails/create-companydetails/create-companydetails.component';
import { CompanyDetailsExpiryNotificationsComponent } from 'app/companydetails/companydetailsexpiry-notifications/companydetailsexpirynotifications.component';
import { InstructorExpiryListComponent } from 'app/instructor/instructorexpiry-list/instructorexpiry-list.component';
import { FollowUpPhoneListComponent } from 'app/phonelog/followupphone-list/followupphone-list.component';
import { CreateFollowUpPhoneComponent } from 'app/phonelog/create-followupphone/create-followphone.component';
import { StudentResultListComponent } from 'app/studentresult/studentresult-list/studentresult-list.component';
import { CreatestudentResultComponent } from 'app/studentresult/studentresult-create/create-studentresult.component';
import { ApprovalNotificationsComponent } from 'app/ApprovalNotifications/approvalsnotifications.component';
import { CreateEmployeeHourLogComponent } from 'app/employeehourlog/employeehourlog-create/create-employeehourlog.component';
import { EmployeehourLogListComponent } from 'app/employeehourlog/employeehourlog-list/employeehourlog-list.component';
import { StudentCourseListComponent } from 'app/studentcourse/studentcourse-list/studentcourse-list.component';
import { CreatestudentCourseComponent } from 'app/studentcourse/studentcourse-create/create-studentcourse.component';
import { CreatestudentLogComponent } from 'app/studentlog/studentlog-create/create-studentlog.component';
import { StudentLogListComponent } from 'app/studentlog/studentlog-list/studentlog-list.component';
import { CreateInstructorLogComponent } from 'app/instructorlog/create-instructorlog/create-instructorlog.component';
import { InstructorLogListComponent } from 'app/instructorlog/instructorlog-list/InstructorLog-list.component';
import { CreateActivityLogComponent } from 'app/activitylog/create-activitylog/create-activitylog.component';
import { ActivityLogListComponent } from 'app/activitylog/activitylog-list/ActivityLog-list.component';
import { MessageListComponent } from 'app/message/message-list/message-list.component';
import { CreateMessageComponent } from 'app/message/create-message/create-message.component';
import { TestListComponent } from 'app/Test/test-list/test-list.component';
import { CreateTestComponent } from 'app/Test/create-test/create-test.component';
import { QuestionListComponent } from 'app/question/question-list/question-list.component';
import { CreateQuestionComponent } from 'app/question/create-question/create-question.component';
import { ExpenseListComponent } from 'app/Expense/expense-list/expense-list.component';
import { CreateExpenseComponent } from 'app/Expense/create-expense/create-expense.component';
import { CreateExpenseLogComponent } from 'app/expenselog/create-expenselog/create-expenselog.component';
import { ExpenseLogListComponent } from 'app/expenselog/expenselog-list/expenselog-list.component';
import { TestResultListComponent } from 'app/Exam/testresult-list/testresult-list.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'truck',      component: VehicleSearchListComponent , canActivate:[AuthGaurdService]},
    { path: 'addVehicle',      component: CreatevehicleComponent ,canActivate:[AuthGaurdService]},
    { path: 'addVehicleLog',      component: CreatevehicleLogComponent ,canActivate:[AuthGaurdService]},
    { path: 'listVehicleLog',      component: VehicleLogListComponent,canActivate:[AuthGaurdService]  },
    { path: 'editVehicle/:id', component: CreatevehicleComponent,canActivate:[AuthGaurdService] },
    { path: 'editVehicleLog/:id', component: EditvehicleLogComponent,canActivate:[AuthGaurdService] },
    { path: 'editDieselLog/:id', component: EditdieselLogComponent,canActivate:[AuthGaurdService] },
    { path: 'listVehicle',      component: VehicleListComponent,canActivate:[AuthGaurdService]  },
    { path: 'listDieselLog',      component: DieselLogListComponent,canActivate:[AuthGaurdService]  },
    { path: 'searchTruck',      component: VehicleSearchListComponent,canActivate:[AuthGaurdService]  },
    { path: 'vehicleExpiryNotifications', component: VehicleExpiryNotificationsComponent,canActivate:[AuthGaurdService]  },
    { path: 'employees', component: EmployeeListComponent,canActivate:[AuthGaurdService]  },
    { path: 'addEmployee', component: CreateEmployeeComponent ,canActivate:[AuthGaurdService] },
    { path: 'addDieselLog', component: CreateDieselLogComponent ,canActivate:[AuthGaurdService] },
    { path: 'logout', component: LogoutComponent },
    { path: 'instructor',      component: DashboardComponent ,canActivate:[AuthGaurdService]},
    { path: 'fleet-logs',      component: StudentListComponent ,canActivate:[AuthGaurdService]},
    { path: 'dashboard',      component: DashboardComponent ,canActivate:[AuthGaurdService]},
    { path: 'user-profile',   component: UserProfileComponent ,canActivate:[AuthGaurdService]},
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'addinstructor', component: CreateInstructorComponent,canActivate:[AuthGaurdService] },
    { path: 'addinstructormonitoring', component: CreateInstructorMonitoringComponent,canActivate:[AuthGaurdService] },
    { path: 'addinstructortraining', component: CreateInstructorTrainingComponent,canActivate:[AuthGaurdService] },
    { path: 'addphonelog', component: CreatePhoneLogComponent,canActivate:[AuthGaurdService] },
    { path: 'addactivitylog', component: CreateActivityLogComponent,canActivate:[AuthGaurdService] },
    { path: 'addExpense', component: CreateExpenseComponent,canActivate:[AuthGaurdService] },
    { path: 'addExpenseLog', component: CreateExpenseLogComponent,canActivate:[AuthGaurdService] },
    { path: 'editExpenseLog/:id', component: CreateExpenseLogComponent,canActivate:[AuthGaurdService] },
    { path: 'editExpense/:id', component: CreateExpenseComponent,canActivate:[AuthGaurdService] },
    { path: 'expenseLogs', component: ExpenseLogListComponent,canActivate:[AuthGaurdService] },
    { path: 'expenses', component: ExpenseListComponent,canActivate:[AuthGaurdService] },
    { path: 'followUps/:id', component: FollowUpPhoneListComponent,canActivate:[AuthGaurdService] },
    { path: 'addFollowUp/:phoneLogId', component: CreateFollowUpPhoneComponent,canActivate:[AuthGaurdService] },
    { path: 'instructors', component: InstructorListComponent,canActivate:[AuthGaurdService] },
    { path: 'instructorExpiryNotifications', component: InstructorExpiryListComponent,canActivate:[AuthGaurdService] },
    { path: 'pendingApprovals', component: ApprovalNotificationsComponent,canActivate:[AuthGaurdService] },
    { path: 'instructorMonitorings', component: InstructorMonitoringListComponent,canActivate:[AuthGaurdService] },
    { path: 'instructorTrainings', component: InstructorTrainingListComponent,canActivate:[AuthGaurdService] },
    { path: 'phoneLogs', component: PhoneLogListComponent,canActivate:[AuthGaurdService] },
    { path: 'activityLogs', component: ActivityLogListComponent,canActivate:[AuthGaurdService] },
    { path: 'message', component: MessageListComponent,canActivate:[AuthGaurdService] },
    { path: 'tests', component: TestListComponent,canActivate:[AuthGaurdService] },
    { path: 'addtest', component: CreateTestComponent,canActivate:[AuthGaurdService] },
    { path: 'editTst:/id', component: CreateTestComponent,canActivate:[AuthGaurdService] },
    { path: 'questions', component: QuestionListComponent,canActivate:[AuthGaurdService] },
    { path: 'testresult', component: TestResultListComponent,canActivate:[AuthGaurdService] },
    { path: 'addQuestion', component: CreateQuestionComponent,canActivate:[AuthGaurdService] },
    { path: 'editQuestion/:id', component: CreateQuestionComponent,canActivate:[AuthGaurdService] },
    { path: 'addmessage', component: CreateMessageComponent,canActivate:[AuthGaurdService] },
    { path: 'editmessage:/id', component: CreateMessageComponent,canActivate:[AuthGaurdService] },
    { path: 'editActivityLog/:id', component: CreateActivityLogComponent,canActivate:[AuthGaurdService] },
    { path: 'companyExpiryNotifications', component: CompanyDetailsExpiryNotificationsComponent,canActivate:[AuthGaurdService] },
    { path: 'editInstructor/:id', component: CreateInstructorComponent,canActivate:[AuthGaurdService] },
    { path: 'editStudentPayment/:id', component: EditstudentPaymentComponent,canActivate:[AuthGaurdService] },
    { path: 'editInstructorMonitoring/:id', component: EditinstructorMonitoringComponent,canActivate:[AuthGaurdService] },
    { path: 'editInstructorTraining/:id', component: EditinstructorTrainingComponent,canActivate:[AuthGaurdService] },
    { path: 'editStudentResult/:id', component: CreatestudentResultComponent,canActivate:[AuthGaurdService] },
    { path: 'editStudentLog/:id', component: CreatestudentLogComponent,canActivate:[AuthGaurdService] },
    { path: 'editInstructorLog/:id', component: CreateInstructorLogComponent,canActivate:[AuthGaurdService] },
    { path: 'editStudentCourse/:id', component: CreatestudentCourseComponent,canActivate:[AuthGaurdService] },
    { path: 'students', component: StudentListComponent,canActivate:[AuthGaurdService] },
    { path: 'studentPayments', component: StudentPaymentListComponent,canActivate:[AuthGaurdService] },
    { path: 'studentPaymentReminder', component: StudentPaymentListReminderComponent,canActivate:[AuthGaurdService] },
    { path: 'searchcriteriastudent/:student', component: StudentListComponent,canActivate:[AuthGaurdService] },
    { path: 'createStudent', component: CreatestudentComponent,canActivate:[AuthGaurdService] },
    { path: 'createStudentPayment', component: CreatestudentPaymentComponent,canActivate:[AuthGaurdService] },
    { path: 'reminders', component: CreateRemindersComponent,canActivate:[AuthGaurdService] },
    { path: 'companyDetails', component: CreateCompanyDetailsComponent,canActivate:[AuthGaurdService] },
    { path: 'studentResult', component: StudentResultListComponent,canActivate:[AuthGaurdService] },
    { path: 'studentLog', component: StudentLogListComponent,canActivate:[AuthGaurdService] },
    { path: 'instructorLog', component: InstructorLogListComponent,canActivate:[AuthGaurdService] },
    { path: 'studenCourse', component: StudentCourseListComponent,canActivate:[AuthGaurdService] },
    { path: 'employeeHourLogs', component: EmployeehourLogListComponent,canActivate:[AuthGaurdService] },
    { path: 'addStudentResult', component: CreatestudentResultComponent,canActivate:[AuthGaurdService] },
    { path: 'addStudentLog', component: CreatestudentLogComponent,canActivate:[AuthGaurdService] },
    { path: 'addInstructorLog', component: CreateInstructorLogComponent,canActivate:[AuthGaurdService] },
    { path: 'addStudentCourse', component: CreatestudentCourseComponent,canActivate:[AuthGaurdService] },
    { path: 'addEmployeeHourLog', component: CreateEmployeeHourLogComponent,canActivate:[AuthGaurdService] },
    { path: 'editEmployeeHourLog/:id', component: CreateEmployeeHourLogComponent,canActivate:[AuthGaurdService] },
    { path: 'editStudent/:id', component:CreatestudentComponent,canActivate:[AuthGaurdService] },
    { path: 'viewStudent/:id', component:StudentViewComponent,canActivate:[AuthGaurdService] },
    { path: 'viewVehicle/:id', component:VehicleViewComponent,canActivate:[AuthGaurdService] },
    { path: 'editEmployee/:id', component:CreateEmployeeComponent,canActivate:[AuthGaurdService] },
    { path: 'editPhoneLog/:id', component:CreatePhoneLogComponent,canActivate:[AuthGaurdService] },
    { path: 'editFollowUp/:followUpId', component:CreateFollowUpPhoneComponent,canActivate:[AuthGaurdService] },
    { path: 'viewEmployee/:id', component:EmployeeViewComponent,canActivate:[AuthGaurdService] },
    { path: 'viewInstructor/:id', component:InstructorViewComponent,canActivate:[AuthGaurdService] },
    
  
 
];
