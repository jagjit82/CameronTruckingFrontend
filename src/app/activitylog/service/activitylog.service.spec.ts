import { TestBed } from '@angular/core/testing';
import { ActivityLogService } from './activitylog.service';





describe('DieselService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivityLogService = TestBed.get(ActivityLogService);
    expect(service).toBeTruthy();
  });
});
