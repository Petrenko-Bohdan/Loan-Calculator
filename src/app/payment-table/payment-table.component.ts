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
import { LoanCalculatorService}	from '../loan-calculator.service';

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
export class PaymentTableComponent implements OnInit {
  @Input() payments: any[] = [];
	displayedColumns: string[] = ['month', 'interests', 'principal', 'balance', 'totalInterest', 'capital', 'capitalInstallment', 'profit', 'overpayment'];
  dataSource = new MatTableDataSource<any>([]);

constructor(private route: ActivatedRoute, private loanCalculatorService: LoanCalculatorService) {}

  ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			const loanAmount = +params['loanAmount'];
			const annualInterestRate = +params['annualInterestRate'];
			const loanPeriod = +params['loanPeriod'];
			const monthlyPaymentAmount = +params['monthlyPaymentAmount'];

			this.payments = this.loanCalculatorService.calculateMonthlyPayment(loanAmount, annualInterestRate, loanPeriod, monthlyPaymentAmount);
			this.dataSource.data = this.payments;
		})
}
}