import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatevehicleComponent } from './create-vehicle.component';


describe('CreatevehicleComponent', () => {
  let component: CreatevehicleComponent;
  let fixture: ComponentFixture<CreatevehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatevehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatevehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
