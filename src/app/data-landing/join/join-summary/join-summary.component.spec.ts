import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinSummaryComponent } from './join-summary.component';

describe('JoinSummaryComponent', () => {
  let component: JoinSummaryComponent;
  let fixture: ComponentFixture<JoinSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
