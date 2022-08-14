import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinContainerComponent } from './join-container.component';

describe('JoinContainerComponent', () => {
  let component: JoinContainerComponent;
  let fixture: ComponentFixture<JoinContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
