import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { VehicleService } from '../service/vehicle.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {

  vehicle : Observable<Object>;
  submitted = false;

  constructor(private vehicleService: VehicleService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
         var id = params['id'];
         this.getVehicle(id);
         
    });
  }

  getVehicle(id){
    this.vehicle = this.vehicleService.getPostVehicle(id);
    this.vehicleService.deleteVehicle(id);
    console.log("this vehicle-=---"+this.vehicle);
  }
  newVehicle(): void {
    //this.submitted = false;
    //this.vehicle = new Vehicle();
  }

  save() {
    //this.vehicle.active=true;
    // this.vehicleService.createVehicle(this.vehicle)
    //   .subscribe(data => console.log(data), error => console.log(error));
    // //this.vehicle = new Vehicle();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
 