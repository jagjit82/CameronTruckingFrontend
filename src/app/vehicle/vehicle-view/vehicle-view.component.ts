import { Observable } from "rxjs";
import { Vehicle } from "../vehicle";
import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { VehicleService } from "../service/vehicle.service";


@Component({
  selector: "app-vehicle-view",
  templateUrl: "./vehicle-view.component.html",
  styleUrls: ["./vehicle-view.component.css"]
})
export class VehicleViewComponent implements OnInit {
  vehicle: Vehicle = new Vehicle();
  modifiedByUser:string;
  constructor(private vehicleService: VehicleService,
    private route: ActivatedRoute,
 ) {
      
    }

    
  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.vehicleService.getVehicle(id).subscribe(data => {
        this.vehicle= data;
        });
      });
    
  }

  reloadData() {
    
  }
  
  

  deleteVehicle(id: number) {
    this.vehicleService.deleteVehicle(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}
