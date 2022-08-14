import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFooterComponent } from './filter-footer.component';

describe('FilterFooterComponent', () => {
  let component: FilterFooterComponent;
  let fixture: ComponentFixture<FilterFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
