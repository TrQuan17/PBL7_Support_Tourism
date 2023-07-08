import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageActionResortDialogComponent } from './manage-action-resort-dialog.component';

describe('ManageActionResortDialogComponent', () => {
  let component: ManageActionResortDialogComponent;
  let fixture: ComponentFixture<ManageActionResortDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageActionResortDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageActionResortDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
