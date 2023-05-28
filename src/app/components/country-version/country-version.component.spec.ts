import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryVersionComponent } from './country-version.component';

describe('ProfileComponent', () => {
  let component: CountryVersionComponent;
  let fixture: ComponentFixture<CountryVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});