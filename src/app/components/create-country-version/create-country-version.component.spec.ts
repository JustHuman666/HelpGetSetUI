import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCountryVersionComponent } from './create-country-version.component';

describe('ProfileComponent', () => {
  let component: CreateCountryVersionComponent;
  let fixture: ComponentFixture<CreateCountryVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCountryVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCountryVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});