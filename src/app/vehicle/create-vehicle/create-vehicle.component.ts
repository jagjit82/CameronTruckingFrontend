import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common/common.service';

import { VehicleService } from '../service/vehicle.service';
import { Vehicle } from '../vehicle';
import { CompanyService } from 'app/company/companyservice';
declare var $: any;
@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreatevehicleComponent implements OnInit {

  vehicle: Vehicle = new Vehicle();
  company:string;
  readonly:string="false";
  validatevehicle: Vehicle = new Vehicle();
  originalvehicle:Vehicle = new Vehicle();
  public vehicleTypes: { [key: string]:string; }[] = [
    { Name: 'Truck', Code: 'Truck' },
    { Name: 'Trailer', Code: 'Trailer' },
    { Name: 'Other', Code: 'Other' },
    ];

  submitted = false;

  constructor(private router: Router,private _ngZone: NgZone,private vehicleService: VehicleService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
   }

  ngOnInit() {
    this.company=sessionStorage.getItem("company");
    this.companyService.getCompany(this.company).subscribe(data=>{
      this.vehicle.company=data;
    });
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.vehicleService.getVehicle(id).subscribe(data => {
        this.vehicle= data;
        this.vehicle.id=data.id;
        });
      });
 
  
      }

      
  newvehicle(): void {
    this.submitted = false;
    this.vehicle = new Vehicle();
  }

  save() {
    //this.vehicle.active=true;
    if(this.vehicle.id!=null){
      this.vehicleService.updateVehicle(this.vehicle).subscribe(data => {console.log(data),
        this.commonService.showNotification('top','center',"Hurray! "+sessionStorage.getItem('username')+" - Your vehicle has been updated successfully!."),
        this.vehicle=new Vehicle(),
        this.router.navigate(['/listVehicle']);   
      },
         error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!.")
        
      });
    }else{
    this.vehicleService.createVehicle(this.vehicle)
      .subscribe(data => {console.log(data),
        this.commonService.showNotification('top','center',"Hurray! "+sessionStorage.getItem('username')+" - Your vehicle has been created successfully!."),this.vehicle=new Vehicle()
        this.router.navigate(['/listVehicle']);   
      }, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)
      });
    }
    
     
  }

  onVehicleType(vehType:string){
    if(vehType=="Trailer"){
      this.readonly="true";
    }else{
      this.readonly="false"
    }
  }

  validatevehicleNum(){
    this.vehicleService.validateVehicleNum(this.vehicle.vehicleNo)
    .subscribe(
      error => {this.validatevehicle=error;
      if(this.validatevehicle!=null && this.vehicle.id==null && this.validatevehicle.id){
        this.commonService.showErrorNotification('top','center',"vehicle Num  "+this.validatevehicle.vehicleNo+ "  already exists.Please choose a different one !!"),
        this.vehicle=new Vehicle();
      }else if(this.vehicle.id!=null && this.vehicle.id!=this.validatevehicle.id){
        this.commonService.showErrorNotification('top','center',"vehicle Num  "+this.validatevehicle.vehicleNo+ "  already exists.Please choose a different one !!"),
        this.vehicle.vehicleNo="";
      }
      }, data => {console.log(data),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!." +data)
    });
    }

  onSubmit() {
  //   this.vehicleService.validateVehicleNum(this.vehicle.vehicleNo).subscribe(error => {this.validatevehicle=error;
  //     if(this.validatevehicle!=null && this.vehicle.id==null && this.validatevehicle.id){
  //       this.commonService.showErrorNotification('top','center',"vehicle Num  "+this.validatevehicle.vehicleNo+ "  already exists.Please choose a different one !!"),
  //       this.vehicle=new Vehicle();
  //     }else if(this.validatevehicle!=null && this.vehicle.id!=null && this.vehicle.id!=this.validatevehicle.id){
  //       this.commonService.showErrorNotification('top','center',"vehicle Num  "+this.validatevehicle.vehicleNo+ "  already exists.Please choose a different one !!"),
  //       this.vehicle.vehicleNo="";
  //     }else{
  //       this.save();
  //     }
  //     }, data => {console.log(data),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!." +data)
        
  //   })  
  //   this.submitted = true;
  // }
    this.save();
  }
  
}
 