import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatestudentCourseComponent } from './create-studentcourse.component';



describe('CreateStudentCourseComponent', () => {
  let component: CreatestudentCourseComponent;
  let fixture: ComponentFixture<CreatestudentCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatestudentCourseComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatestudentCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy();
  });
});
