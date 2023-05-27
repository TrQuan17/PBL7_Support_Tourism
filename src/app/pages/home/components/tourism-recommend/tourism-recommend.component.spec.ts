import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourismRecommendComponent } from './tourism-recommend.component';

describe('TourismRecommendComponent', () => {
  let component: TourismRecommendComponent;
  let fixture: ComponentFixture<TourismRecommendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourismRecommendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourismRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
