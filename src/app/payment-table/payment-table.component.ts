import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-payment-table',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatSlideToggleModule,
  ],
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnChanges {
  @Input() payments: any[] = [];
  displayedColumns: String[] = [
    'month',
    'capital',
    'interest',
    'capitalInstallment',
    'overpayment',
    'profit',
  ];
  dataSource = new MatTableDataSource<any>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['payments']) {
      this.dataSource.data = this.payments;
    }
  }
}
