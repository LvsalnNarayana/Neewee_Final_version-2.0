import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLandingComponent } from './data-landing.component';

describe('DataLandingComponent', () => {
  let component: DataLandingComponent;
  let fixture: ComponentFixture<DataLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
