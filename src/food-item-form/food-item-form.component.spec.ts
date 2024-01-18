import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemFormComponent } from './food-item-form.component';

describe('FoodItemFormComponent', () => {
  let component: FoodItemFormComponent;
  let fixture: ComponentFixture<FoodItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodItemFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
