import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authorization/authentication.service';
import { Company } from 'app/company/company';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  company: Company = null;
  public companyList: Array<Company>  = [
    {id: 1, company: 'Cameron Driver Education', description: '', createdDate: '', modifiedDate: '', status: ''},
    {id: 2, company: 'Donovan Driver Education', description: '', createdDate: '', modifiedDate: '', status: ''},

];
  constructor(private router: Router,
    private loginservice: AuthenticationService, private commonService: CommonService) { }

  ngOnInit() {

  }
  change() {

  }

  checkLogin() {
    console.log(this.company);
    if (this.username == null || this.username =='' || this.password == null || this.password =='') {
      this.commonService.showErrorNotification('top', 'center','Username/Password is blank.');
    } else
    if (this.company == null) {
      this.commonService.showErrorNotification('top', 'center','Please select the Company.');
    } else
    if (this.loginservice.authenticate(this.username, this.password, this.company.company)
    ) {
      this.loginservice.getUser();
      this.invalidLogin = false;
      this.router.navigate(['/listVehicle'])
      } else {
      this.invalidLogin = true
    }
  }

}
