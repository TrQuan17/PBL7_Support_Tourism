import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataWithSearchComponent } from './data-with-search.component';

describe('DataWithSearchComponent', () => {
  let component: DataWithSearchComponent;
  let fixture: ComponentFixture<DataWithSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataWithSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataWithSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
