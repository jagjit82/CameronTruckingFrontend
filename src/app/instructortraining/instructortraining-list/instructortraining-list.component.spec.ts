import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorTrainingListComponent } from './InstructorTraining-list.component';

describe('InstructorTrainingListComponent', () => {
  let component: InstructorTrainingListComponent;
  let fixture: ComponentFixture<InstructorTrainingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorTrainingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorTrainingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
