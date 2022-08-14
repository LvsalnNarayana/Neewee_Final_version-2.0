import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFooterComponent } from './data-footer.component';

describe('DataFooterComponent', () => {
  let component: DataFooterComponent;
  let fixture: ComponentFixture<DataFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
