import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatestudentResultComponent } from './create-studentresult.component';



describe('CreateStudentResultComponent', () => {
  let component: CreatestudentResultComponent;
  let fixture: ComponentFixture<CreatestudentResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatestudentResultComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatestudentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy();
  });
});
