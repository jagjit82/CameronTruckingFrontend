import { TestBed } from '@angular/core/testing';
import { DieselLogService } from './diesellog.service';




describe('DieselService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DieselLogService = TestBed.get(DieselLogService);
    expect(service).toBeTruthy();
  });
});
