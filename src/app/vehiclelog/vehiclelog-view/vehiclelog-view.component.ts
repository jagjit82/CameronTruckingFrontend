import { Observable } from "rxjs";
import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { VehicleLog } from "../vehicleLog";
import { VehicleLogService } from "../service/vehicleLog.service";


@Component({
  selector: "app-vehicleLog-view",
  templateUrl: "./vehicleLog-view.component.html",
  styleUrls: ["./vehicleLog-view.component.css"]
})
export class VehicleLogViewComponent implements OnInit {
  vehicleLog: VehicleLog = new VehicleLog();
  modifiedByUser:string;
  constructor(private vehicleLogService: VehicleLogService,
    private route: ActivatedRoute,
 ) {
      
    }

    
  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.vehicleLogService.getVehicleLog(id).subscribe(data => {
        this.vehicleLog= data;
        });
      });
    
  }

  reloadData() {
    
  }
  
  

  deleteVehicleLog(id: number) {
    this.vehicleLogService.deleteVehicleLog(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}
