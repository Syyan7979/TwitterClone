import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowWindowComponent } from './follow-window.component';

describe('FollowWindowComponent', () => {
  let component: FollowWindowComponent;
  let fixture: ComponentFixture<FollowWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
