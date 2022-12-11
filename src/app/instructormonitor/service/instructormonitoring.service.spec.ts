import { TestBed } from '@angular/core/testing';
import { InstructorMonitoringService } from './instructormonitoring.service';





describe('DieselService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstructorMonitoringService = TestBed.get(InstructorMonitoringService);
    expect(service).toBeTruthy();
  });
});
