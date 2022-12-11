import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateInstructorMonitoringComponent } from './create-instructormonitoring.component';



describe('CreateinstructorMonitoringComponent', () => {
  let component: CreateInstructorMonitoringComponent;
  let fixture: ComponentFixture<CreateInstructorMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInstructorMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInstructorMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
