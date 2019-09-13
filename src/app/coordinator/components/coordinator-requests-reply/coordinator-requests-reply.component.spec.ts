import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorRequestsReplyComponent } from './coordinator-requests-reply.component';

describe('CoordinatorRequestsReplyComponent', () => {
  let component: CoordinatorRequestsReplyComponent;
  let fixture: ComponentFixture<CoordinatorRequestsReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorRequestsReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorRequestsReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
