import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServiceDialogComponent } from './manage-service-dialog.component';

describe('ManageServiceDialogComponent', () => {
  let component: ManageServiceDialogComponent;
  let fixture: ComponentFixture<ManageServiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageServiceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
