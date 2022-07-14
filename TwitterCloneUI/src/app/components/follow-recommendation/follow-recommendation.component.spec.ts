import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowRecommendationComponent } from './follow-recommendation.component';

describe('FollowRecommendationComponent', () => {
  let component: FollowRecommendationComponent;
  let fixture: ComponentFixture<FollowRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowRecommendationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
