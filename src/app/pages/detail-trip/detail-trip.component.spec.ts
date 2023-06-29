import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTripComponent } from './detail-trip.component';

describe('DetailTripComponent', () => {
  let component: DetailTripComponent;
  let fixture: ComponentFixture<DetailTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
