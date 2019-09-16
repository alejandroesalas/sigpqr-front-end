import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRequestAttachmentComponent } from './student-request-attachment.component';

describe('StudentRequestAttachmentComponent', () => {
  let component: StudentRequestAttachmentComponent;
  let fixture: ComponentFixture<StudentRequestAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentRequestAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRequestAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
