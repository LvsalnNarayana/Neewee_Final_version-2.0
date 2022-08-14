import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinFooterComponent } from './join-footer.component';

describe('JoinFooterComponent', () => {
  let component: JoinFooterComponent;
  let fixture: ComponentFixture<JoinFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
