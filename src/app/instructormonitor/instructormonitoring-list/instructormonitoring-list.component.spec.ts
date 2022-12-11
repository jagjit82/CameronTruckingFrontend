import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorMonitoringListComponent } from './InstructorMonitoring-list.component';

describe('InstructorMonitoringListComponent', () => {
  let component: InstructorMonitoringListComponent;
  let fixture: ComponentFixture<InstructorMonitoringListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorMonitoringListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorMonitoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
