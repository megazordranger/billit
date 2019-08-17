import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilledCellComponent } from './billed-cell.component';

describe('BilledCellComponent', () => {
  let component: BilledCellComponent;
  let fixture: ComponentFixture<BilledCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilledCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilledCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
