import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateMigrantComponent } from './update.migrant.component';

describe('ProfileComponent', () => {
  let component: UpdateMigrantComponent;
  let fixture: ComponentFixture<UpdateMigrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMigrantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMigrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});