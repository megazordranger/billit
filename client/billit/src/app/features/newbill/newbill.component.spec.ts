import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbillComponent } from './newbill.component';

describe('NewbillComponent', () => {
  let component: NewbillComponent;
  let fixture: ComponentFixture<NewbillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewbillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
