import { TestBed } from '@angular/core/testing';
import { InstructorTrainingService } from './instructortraining.service';





describe('DieselService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstructorTrainingService = TestBed.get(InstructorTrainingService);
    expect(service).toBeTruthy();
  });
});
