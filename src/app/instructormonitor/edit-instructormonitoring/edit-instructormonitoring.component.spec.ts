import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditinstructorMonitoringComponent } from './edit-InstructorMonitoring.component';


describe('EditInstructorMonitoringComponent', () => {
  let component: EditinstructorMonitoringComponent;
  let fixture: ComponentFixture<EditinstructorMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditinstructorMonitoringComponent ]
    })
    .compileComponents();
  }));

  
  it('should edit', () => {
    expect(component).toBeTruthy();
  });
});
