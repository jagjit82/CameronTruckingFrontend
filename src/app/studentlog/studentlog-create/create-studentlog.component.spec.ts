import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatestudentLogComponent } from './create-studentlog.component';



describe('CreateStudentLogComponent', () => {
  let component: CreatestudentLogComponent;
  let fixture: ComponentFixture<CreatestudentLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatestudentLogComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatestudentLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy();
  });
});
