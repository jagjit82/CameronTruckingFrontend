import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InstructorExpiryListComponent } from './instructorexpiry-list.component';



describe('InstructorListComponent', () => {
  let component: InstructorExpiryListComponent;
  let fixture: ComponentFixture<InstructorExpiryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorExpiryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorExpiryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
