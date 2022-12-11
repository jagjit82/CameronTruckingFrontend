import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePhoneLogComponent } from './create-phonelog.component';



describe('CreatephoneLogComponent', () => {
  let component: CreatePhoneLogComponent;
  let fixture: ComponentFixture<CreatePhoneLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePhoneLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePhoneLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
