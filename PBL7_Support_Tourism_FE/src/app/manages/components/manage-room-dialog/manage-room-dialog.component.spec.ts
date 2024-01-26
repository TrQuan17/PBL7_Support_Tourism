import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRoomDialogComponent } from './manage-room-dialog.component';

describe('ManageRoomDialogComponent', () => {
  let component: ManageRoomDialogComponent;
  let fixture: ComponentFixture<ManageRoomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRoomDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
