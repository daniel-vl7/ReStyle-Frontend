import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportSnackComponent } from './support-snack.component';

describe('SupportSnackComponent', () => {
  let component: SupportSnackComponent;
  let fixture: ComponentFixture<SupportSnackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportSnackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
