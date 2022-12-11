import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditstudentPaymentComponent } from './edit-studentpayment.component';


describe('EditStudentPaymentComponent', () => {
  let component: EditstudentPaymentComponent;
  let fixture: ComponentFixture<EditstudentPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditstudentPaymentComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditstudentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should edit', () => { 
    expect(component).toBeTruthy();
  });
});
