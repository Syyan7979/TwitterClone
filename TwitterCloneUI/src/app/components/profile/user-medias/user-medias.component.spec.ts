import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMediasComponent } from './user-medias.component';

describe('UserMediasComponent', () => {
  let component: UserMediasComponent;
  let fixture: ComponentFixture<UserMediasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMediasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
