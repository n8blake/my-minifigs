import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPageComponent } from './set-page.component';

describe('SetPageComponent', () => {
  let component: SetPageComponent;
  let fixture: ComponentFixture<SetPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetPageComponent]
    });
    fixture = TestBed.createComponent(SetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
