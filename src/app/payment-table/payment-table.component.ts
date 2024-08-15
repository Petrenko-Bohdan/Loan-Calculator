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
import { LoanCalculatorService } from '../loan-calculator.service';
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
		CommonModule
  ],
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnInit {
	
  @Input() payments: any[] = [];
  displayedColumns: string[] = ['month', 'capital', 'interests', 'principalInstalment', 'totalInstallment', 'overpayment', 'profit'];
  dataSource = new MatTableDataSource<any>([]);
	errorMessage: string = '';
  constructor(private route: ActivatedRoute, private loanCalculatorService: LoanCalculatorService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const loanAmount = +params['loanAmount'];
      const annualInterestRate = +params['annualInterestRate'];
      let loanPeriod = +params['loanPeriod'];
      let monthlyPaymentAmount = +params['monthlyPaymentAmount'];

      if (!loanPeriod && monthlyPaymentAmount) {
        loanPeriod = this.loanCalculatorService.calculateLoanPeriod(loanAmount, annualInterestRate, monthlyPaymentAmount);
        this.errorMessage = this.loanCalculatorService.errorMessage;
      } else if (!monthlyPaymentAmount && loanPeriod) {
        monthlyPaymentAmount = this.loanCalculatorService.calculateMonthlyPaymentAmount(loanAmount, annualInterestRate, loanPeriod);
      }

      if (!this.errorMessage) {
        this.payments = this.loanCalculatorService.calculateMonthlyPayment(loanAmount, annualInterestRate, loanPeriod, monthlyPaymentAmount);
        this.dataSource.data = this.payments;
      }
    });
  }

	updateOverpayment(element: any): void {
    this.payments = this.loanCalculatorService.recalculatePaymentsWithOverpayment(this.payments);
    this.dataSource.data = this.payments;
  }
}