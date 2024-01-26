import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResortComponent } from './manage-resort.component';

describe('ManageResortComponent', () => {
  let component: ManageResortComponent;
  let fixture: ComponentFixture<ManageResortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageResortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageResortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
