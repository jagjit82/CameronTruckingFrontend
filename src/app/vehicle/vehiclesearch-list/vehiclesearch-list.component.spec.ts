import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleSearchListComponent } from './vehiclesearch-list.component';


describe('VehicleListComponent', () => {
  let component: VehicleSearchListComponent;
  let fixture: ComponentFixture<VehicleSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
