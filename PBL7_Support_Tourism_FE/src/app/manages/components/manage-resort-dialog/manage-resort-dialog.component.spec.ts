import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResortDialogComponent } from './manage-resort-dialog.component';

describe('ManageResortDialogComponent', () => {
  let component: ManageResortDialogComponent;
  let fixture: ComponentFixture<ManageResortDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageResortDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageResortDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
