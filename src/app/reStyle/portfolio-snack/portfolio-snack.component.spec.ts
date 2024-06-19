import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSnackComponent } from './portfolio-snack.component';

describe('PortfolioSnackComponent', () => {
  let component: PortfolioSnackComponent;
  let fixture: ComponentFixture<PortfolioSnackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioSnackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
