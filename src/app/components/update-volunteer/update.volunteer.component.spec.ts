import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateVolunteerComponent } from './update.volunteer.component';

describe('ProfileComponent', () => {
  let component: UpdateVolunteerComponent;
  let fixture: ComponentFixture<UpdateVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVolunteerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});