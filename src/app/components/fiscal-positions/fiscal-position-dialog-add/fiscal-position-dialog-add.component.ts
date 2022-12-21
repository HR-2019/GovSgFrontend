import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FiscalPositionService } from 'src/app/services/fiscal-position.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-fiscal-position-dialog-add',
  templateUrl: './fiscal-position-dialog-add.component.html',
  styleUrls: ['./fiscal-position-dialog-add.component.css']
})
export class FiscalPositionDialogAddComponent implements OnInit{
  fiscalPositionForm!: FormGroup;
  btnAction: string;
  dialogTitle: string;

  constructor(private formBuilder: FormBuilder,
    private fiscalPositionService: FiscalPositionService,
    @Inject(MAT_DIALOG_DATA) private editData : any,
    private dialogRef: MatDialogRef<FiscalPositionDialogAddComponent>){

      this.btnAction = 'Save';
      this.dialogTitle = 'Add Fiscal Position';

  }

  ngOnInit(): void {
    this.fiscalPositionForm = this.formBuilder.group({
      yearOfBalance : ['', Validators.required],
      actualRevisedEstimated : ['', Validators.required],
      category : ['', Validators.required],
      item : ['', Validators.required],
      amount : ['', Validators.required],
      percentOfGdp : ['', Validators.required]
    })

    if (this.editData){
      this.dialogTitle = 'Edit Fiscal Position';
      this.btnAction = 'Update';
      this.fiscalPositionForm.controls['yearOfBalance'].setValue(this.editData.yearOfBalance);
      this.fiscalPositionForm.controls['actualRevisedEstimated'].setValue(this.editData.actualRevisedEstimated);
      this.fiscalPositionForm.controls['category'].setValue(this.editData.category);
      this.fiscalPositionForm.controls['item'].setValue(this.editData.item);
      this.fiscalPositionForm.controls['amount'].setValue(this.editData.amount);
      this.fiscalPositionForm.controls['percentOfGdp'].setValue(this.editData.percentOfGdp);
    }

  }

  addFiscalPosition(){

    if (this.fiscalPositionForm.invalid){
      alert('All fields are required');
      return;
    }

    if (!this.editData) {
      this.fiscalPositionService.saveFiscalPosition(this.fiscalPositionForm.value)
        .subscribe({
          next: (res) => {
            alert('Fiscal position added!');
            this.fiscalPositionForm.reset();
            this.dialogRef.close("save");
          },
          error: () => {
            alert('Error while adding the fiscal position');
          }
        })
    } else {
      this.updateFiscalPosition();
    }

  }

  updateFiscalPosition(){

    this.fiscalPositionService.updateFiscalPosition(this.editData.id, this.fiscalPositionForm.value)
    .subscribe({
      next: (res) => {
        alert('Fiscal position updated!');
        this.fiscalPositionForm.reset();
        this.dialogRef.close("update");
      },
      error: () => {
        alert('Error while updating fiscal position!');
      }
    })
  }

}
