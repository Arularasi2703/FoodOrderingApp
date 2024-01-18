import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemEditComponent } from './food-item-edit.component';

describe('FoodItemEditComponent', () => {
  let component: FoodItemEditComponent;
  let fixture: ComponentFixture<FoodItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodItemEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
