import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FiscalPosition } from 'src/app/models/fiscal-position.model';
import { FiscalPositionService } from 'src/app/services/fiscal-position.service';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { FiscalPositionDialogAddComponent } from '../../fiscal-position-dialog-add/fiscal-position-dialog-add.component';

@Component({
  selector: 'app-fiscal-position-list',
  templateUrl: './fiscal-position-list.component.html',
  styleUrls: ['./fiscal-position-list.component.css']
})
export class FiscalPositionListComponent implements AfterViewInit{

  displayedColumns: string[] = ['ID', 'Year of balance', 'Actual/Revised/Estimated', 'Category', 'Item', 'Amount', 'Percent of Gdp', 'Actions'];

  data: FiscalPosition[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private fiscalPositionService: FiscalPositionService, private dialog: MatDialog){

  }

  ngAfterViewInit() {
    this.getAllFiscalPositions();
  }

  getAllFiscalPositions(){
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.fiscalPositionService.getAllFiscalPositions(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }

          this.resultsLength = data.totalElements;
          return data.content;
        }),
      )
      .subscribe(data => (this.data = data));
  }

  editFiscalPosition(row: any){
    this.dialog.open(FiscalPositionDialogAddComponent, {
      width:'30%',
      data:row
    }).afterClosed().subscribe(
      val => {
        if (val === 'update'){
          this.getAllFiscalPositions();
        }
      }
    )
  }

  deleteFiscalPosition(id: number){
    this.fiscalPositionService.deleteFiscalPosition(id).subscribe({
      next: (res) => {
        alert('Fiscal position deleted!');
        this.getAllFiscalPositions();
      },
      error: () => {
        alert('Error while deleting the fiscal position!')
      }
    })
  }

  openDialog() {
    this.dialog.open(FiscalPositionDialogAddComponent, {
      width: '30%'
    }).afterClosed().subscribe(
      val => {
        if (val === 'save'){
          this.getAllFiscalPositions();
        }
      }
    )
  }

}
