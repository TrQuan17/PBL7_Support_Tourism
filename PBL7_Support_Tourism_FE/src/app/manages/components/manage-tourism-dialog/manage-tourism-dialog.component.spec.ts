import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTourismDialogComponent } from './manage-tourism-dialog.component';

describe('ManageTourismDialogComponent', () => {
  let component: ManageTourismDialogComponent;
  let fixture: ComponentFixture<ManageTourismDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTourismDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTourismDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
