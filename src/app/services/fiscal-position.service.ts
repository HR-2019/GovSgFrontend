import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FiscalPosition } from '../models/fiscal-position.model';
import { HttpClient } from '@angular/common/http';
import { FiscalPositionApi } from '../models/fiscal-position-api.model';
import { SortDirection } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class FiscalPositionService {

  url: string = 'http://localhost:8080/api/v1/fiscal-positions/';

  constructor(private http: HttpClient) { }

  getAllFiscalPositions(sort: string, order: SortDirection | string, page: number): Observable<FiscalPositionApi>{
    sort = sort.toLowerCase();
    return this.http.get<FiscalPositionApi>(`${this.url}?page=${page}&sort=${sort},${order}`);
  }

  saveFiscalPosition(fiscalPosition: FiscalPosition){
    return this.http.post(this.url, fiscalPosition);
  }

  updateFiscalPosition(id: number, fiscalPosition: FiscalPosition): Observable<FiscalPosition>{
    console.log(fiscalPosition);
    return this.http.put<FiscalPosition>(this.url + id, fiscalPosition);
  }

  deleteFiscalPosition(id: number){
    return this.http.delete(this.url + id);
  }

}
