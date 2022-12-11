import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFollowUpPhoneComponent } from './create-followphone.component';




describe('createFollowUpPhoneComponent', () => {
  let component: CreateFollowUpPhoneComponent;
  let fixture: ComponentFixture<CreateFollowUpPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFollowUpPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFollowUpPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
