import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCompanyDetailsComponent } from './create-companydetails.component';


describe('CreatecompanyDetailsComponent', () => {
  let component: CreateCompanyDetailsComponent;
  let fixture: ComponentFixture<CreateCompanyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCompanyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
