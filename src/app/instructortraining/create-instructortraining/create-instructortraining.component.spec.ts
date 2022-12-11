import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateInstructorTrainingComponent } from './create-instructortraining.component';



describe('CreateinstructorTrainingComponent', () => {
  let component: CreateInstructorTrainingComponent;
  let fixture: ComponentFixture<CreateInstructorTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInstructorTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInstructorTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
