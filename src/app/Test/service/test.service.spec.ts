import { TestBed } from '@angular/core/testing';
import { TestService } from './test.service';





describe('DieselService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestService = TestBed.get(TestService);
    expect(service).toBeTruthy();
  });
});
