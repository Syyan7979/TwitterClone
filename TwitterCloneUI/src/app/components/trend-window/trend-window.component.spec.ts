import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendWindowComponent } from './trend-window.component';

describe('TrendWindowComponent', () => {
  let component: TrendWindowComponent;
  let fixture: ComponentFixture<TrendWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
