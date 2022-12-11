import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneLogListComponent } from './PhoneLog-list.component';

describe('PhoneLogListComponent', () => {
  let component: PhoneLogListComponent;
  let fixture: ComponentFixture<PhoneLogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneLogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
