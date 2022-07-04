import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithRepliesComponent } from './with-replies.component';

describe('WithRepliesComponent', () => {
  let component: WithRepliesComponent;
  let fixture: ComponentFixture<WithRepliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithRepliesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
