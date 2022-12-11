import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyDetailsExpiryNotificationsComponent } from './companydetailsexpirynotifications.component';



describe('CompanyDetailsExpiryNotificationsComponent', () => {
  let component: CompanyDetailsExpiryNotificationsComponent;
  let fixture: ComponentFixture<CompanyDetailsExpiryNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDetailsExpiryNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailsExpiryNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
