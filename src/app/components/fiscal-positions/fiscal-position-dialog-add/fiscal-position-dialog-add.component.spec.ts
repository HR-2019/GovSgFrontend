import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalPositionDialogAddComponent } from './fiscal-position-dialog-add.component';

describe('FiscalPositionDialogAddComponent', () => {
  let component: FiscalPositionDialogAddComponent;
  let fixture: ComponentFixture<FiscalPositionDialogAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiscalPositionDialogAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiscalPositionDialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
