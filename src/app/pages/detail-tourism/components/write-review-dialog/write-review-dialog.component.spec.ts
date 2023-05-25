import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteReviewDialogComponent } from './write-review-dialog.component';

describe('WriteReviewDialogComponent', () => {
  let component: WriteReviewDialogComponent;
  let fixture: ComponentFixture<WriteReviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteReviewDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
