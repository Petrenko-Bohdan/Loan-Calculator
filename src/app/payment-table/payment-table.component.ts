import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LoanCalculatorService } from '../services/loan-calculator.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-table',
  standalone: true,
  imports: [
    MatCardModule,
		MatTableModule,
		FormsModule,
  ],
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss'],
})
export class PaymentTableComponent implements OnInit {
	@Input() payments: any[]= [];
  displayedColumns: string[] = ['month', 'capital', 'interest', 'principalInstalment', 'overpayment', 'profit',];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(private route: ActivatedRoute, private loanCalculateService: LoanCalculatorService) {}

  ngOnInit(): void {
    this.loanCalculateService.payments$.subscribe((data)=>{
      this.payments = data;
      this.dataSource.data = this.payments;
    });
  }

  public updateOverpayment(index: number): void {
    this.loanCalculateService.calculateLoanWithOverpayment(index);
  }
}