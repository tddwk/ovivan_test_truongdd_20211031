import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyNewComponent } from './technology-new.component';

describe('TechnologyNewComponent', () => {
  let component: TechnologyNewComponent;
  let fixture: ComponentFixture<TechnologyNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
