import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatestudentPaymentComponent } from './create-studentpayment.component';


describe('CreateStudentPaymentComponent', () => {
  let component: CreatestudentPaymentComponent;
  let fixture: ComponentFixture<CreatestudentPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatestudentPaymentComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatestudentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy();
  });
});
