import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FiscalPositionDialogAddComponent } from './components/fiscal-positions/fiscal-position-dialog-add/fiscal-position-dialog-add.component';
import { FiscalPositionService } from './services/fiscal-position.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'govsgfrontend';

  constructor(public dialog: MatDialog, private fiscalPositionService: FiscalPositionService){

  }

  openDialog() {
    this.dialog.open(FiscalPositionDialogAddComponent, {
      width: '30%'
    }).afterClosed().subscribe(
      val => {
        console.log(val);
        if (val === 'save'){
          this.fiscalPositionService.getAllFiscalPositions('id', 'asc', 0);
        }
      }
    )
  }

}
