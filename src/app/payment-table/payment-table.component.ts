import { Component, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LoanCalculatorService } from '../services/loan-calculator.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PaymentElement } from '../models/payment-element.model';


@Component({
  selector: 'app-payment-table',
  standalone: true,
  imports: [
    MatCardModule,
		MatTableModule,
		FormsModule,
		CommonModule,
  ],
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss'],
})
export class PaymentTableComponent implements OnInit {
  displayedColumns: string[] = ['month', 'capital', 'interest', 'principalInstalment', 'overpayment', 'profit',];
  payments$!: Observable<any>;
	

  constructor(private route: ActivatedRoute, private loanCalculateService: LoanCalculatorService) {}

  ngOnInit(): void {
    this.payments$ = this.loanCalculateService.payments$;
  }

	getOverpayment(element: PaymentElement): number | null {
    return element.overpayment === 0 ? null : element.overpayment;
  }

  setOverpayment(element: PaymentElement, value: any, index: number): void {
    element.overpayment = value === null ? 0 : value;
  }

  public updateOverpayment(index: number): void {
    this.loanCalculateService.calculateLoanWithOverpayment(index);
  }
}