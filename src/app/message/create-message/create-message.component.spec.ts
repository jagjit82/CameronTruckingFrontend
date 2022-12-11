import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateActivityLogComponent } from './create-activitylog.component';



describe('CreateactivityLogComponent', () => {
  let component: CreateActivityLogComponent;
  let fixture: ComponentFixture<CreateActivityLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActivityLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActivityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
