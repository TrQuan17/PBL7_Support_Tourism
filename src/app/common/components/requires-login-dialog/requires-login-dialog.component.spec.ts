import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiresLoginDialogComponent } from './requires-login-dialog.component';

describe('RequiresLoginDialogComponent', () => {
  let component: RequiresLoginDialogComponent;
  let fixture: ComponentFixture<RequiresLoginDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiresLoginDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiresLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
