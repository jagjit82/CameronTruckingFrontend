import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentLogListComponent } from './studentlog-list.component';



describe('StudentLogListComponent', () => {
  let component: StudentLogListComponent;
  let fixture: ComponentFixture<StudentLogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
