import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditinstructorTrainingComponent } from './edit-InstructorTraining.component';


describe('EditInstructorTrainingComponent', () => {
  let component: EditinstructorTrainingComponent;
  let fixture: ComponentFixture<EditinstructorTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditinstructorTrainingComponent ]
    })
    .compileComponents();
  }));

  
  it('should edit', () => {
    expect(component).toBeTruthy();
  });
});
