import { TestBed } from '@angular/core/testing';
import { InstructorService } from './instructorservice';



describe('InstructorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstructorService = TestBed.get(InstructorService);
    expect(service).toBeTruthy();
  });
});
