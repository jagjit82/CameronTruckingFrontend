import { TestBed } from '@angular/core/testing';
import { CompanyService } from './companyservice';



describe('TruckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyService = TestBed.get(CompanyService);
    expect(service).toBeTruthy();
  });
});
