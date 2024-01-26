import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTourismComponent } from './manage-tourism.component';

describe('ManageTourismComponent', () => {
  let component: ManageTourismComponent;
  let fixture: ComponentFixture<ManageTourismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTourismComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTourismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
