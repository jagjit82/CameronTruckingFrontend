import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';

import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthHtppInterceptorService } from './authorization/basic-auth-htpp-interceptor.service';
import { MatDialogModule, MatDatepickerInput, MatOption, MatOptionModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import { StudentViewComponent } from './student/student-view/student-view.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent

  ],
  providers: [{ provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true }],
  bootstrap: [AppComponent],

})
export class AppModule { }
