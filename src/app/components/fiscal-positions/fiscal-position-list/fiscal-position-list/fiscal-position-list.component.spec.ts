import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalPositionListComponent } from './fiscal-position-list.component';

describe('FiscalPositionListComponent', () => {
  let component: FiscalPositionListComponent;
  let fixture: ComponentFixture<FiscalPositionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiscalPositionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiscalPositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
