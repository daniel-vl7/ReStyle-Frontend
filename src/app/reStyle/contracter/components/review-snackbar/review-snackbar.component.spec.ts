import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSnackbarComponent } from './review-snackbar.component';

describe('ReviewSnackbarComponent', () => {
  let component: ReviewSnackbarComponent;
  let fixture: ComponentFixture<ReviewSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewSnackbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
