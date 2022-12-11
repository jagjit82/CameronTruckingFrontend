import { TestBed } from '@angular/core/testing';
import { StudentPaymentService } from './studentpaymentservice';

describe('TruckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentPaymentService = TestBed.get(StudentPaymentService);
    expect(service).toBeTruthy();
  });
});
