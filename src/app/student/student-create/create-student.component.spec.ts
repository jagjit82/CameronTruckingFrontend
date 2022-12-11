import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFleetLogComponent } from './create-fleetlog.component';



describe('CreateFleetLogComponent', () => {
  let component: CreateFleetLogComponent;
  let fixture: ComponentFixture<CreateFleetLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFleetLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFleetLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy();
  });
});
