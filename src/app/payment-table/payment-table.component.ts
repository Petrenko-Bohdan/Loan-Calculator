import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { LoanCalculatorService } from '../services/loan-calculator.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    FormsModule,
    CommonModule,
  ],
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss'],
})
export class PaymentTableComponent implements OnInit {
  @Input() payments: any[] = [];
  displayedColumns: string[] = [
    'month',
    'capital',
    'interests',
    'principalInstalment',
    'totalInstallment',
    'overpayment',
    'profit',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private loanCalculatorService: LoanCalculatorService
  ) {}

  ngOnInit(): void {
      this.loanCalculatorService.payment$.subscribe((data) => {
      this.payments = data;
      this.dataSource.data = this.payments;
    });
		
		
  }

  public updateOverpayment(element: any): void {
    // this.payments = this.loanCalculatorService.recalculatePaymentsWithOverpayment(this.payments);
    this.dataSource.data = this.payments;
    console.log('Updated Payments:', this.payments); // Add this line
    console.log('Updated DataSource:', this.dataSource.data); // Add this line
  }
}
