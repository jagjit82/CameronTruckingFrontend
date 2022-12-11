import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateInstructorLogComponent } from './create-instructorlog.component';



describe('CreateinstructorMonitoringComponent', () => {
  let component: CreateInstructorLogComponent;
  let fixture: ComponentFixture<CreateInstructorLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInstructorLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInstructorLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
