import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesComponent } from './manages.component';

describe('ManagesComponent', () => {
  let component: ManagesComponent;
  let fixture: ComponentFixture<ManagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
