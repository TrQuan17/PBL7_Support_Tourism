import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailResortComponent } from './detail-resort.component';

describe('DetailResortComponent', () => {
  let component: DetailResortComponent;
  let fixture: ComponentFixture<DetailResortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailResortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailResortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
