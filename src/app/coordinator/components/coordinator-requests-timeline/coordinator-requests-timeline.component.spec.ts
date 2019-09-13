import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorRequestsTimelineComponent } from './coordinator-requests-timeline.component';

describe('CoordinatorRequestsTimelineComponent', () => {
  let component: CoordinatorRequestsTimelineComponent;
  let fixture: ComponentFixture<CoordinatorRequestsTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorRequestsTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorRequestsTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
