import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovalNotificationsComponent } from './approvalsnotifications.component';


describe('ApprovalNotificationsComponent', () => {
  let component: ApprovalNotificationsComponent;
  let fixture: ComponentFixture<ApprovalNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
