import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatestudentResultComponent } from 'app/studentresult/studentresult-create/create-studentresult.component';



describe('CreateEmployeeHourLogComponent', () => {
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
