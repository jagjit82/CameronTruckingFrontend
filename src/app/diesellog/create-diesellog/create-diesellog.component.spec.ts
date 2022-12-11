import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDieselLogComponent } from './create-diesellog.component';



describe('CreatedieselLogComponent', () => {
  let component: CreateDieselLogComponent;
  let fixture: ComponentFixture<CreateDieselLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDieselLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDieselLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
