import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleExpiryNotificationsComponent } from './vehicleexpirynotifications.component';


describe('VehicleExpiryNotificationsComponent', () => {
  let component: VehicleExpiryNotificationsComponent;
  let fixture: ComponentFixture<VehicleExpiryNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleExpiryNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleExpiryNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
