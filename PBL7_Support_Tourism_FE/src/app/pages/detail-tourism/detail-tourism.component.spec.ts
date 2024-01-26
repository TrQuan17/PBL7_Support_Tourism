import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTourismComponent } from './detail-tourism.component';

describe('DetailTourismComponent', () => {
  let component: DetailTourismComponent;
  let fixture: ComponentFixture<DetailTourismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTourismComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTourismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
