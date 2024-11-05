import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LoanCalculatorService } from '../services/loan-calculator.service';
import { FormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';


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
export class PaymentTableComponent implements OnDestroy, OnInit {
  displayedColumns: string[] = ['month', 'capital', 'interest', 'principalInstalment', 'overpayment', 'profit',];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
	private unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private loanCalculateService: LoanCalculatorService) {}

  ngOnInit(): void {
    this.loanCalculateService.payments$.pipe(takeUntil(this.unsubscribe$)).subscribe((data)=>{
      this.dataSource.data = data;
    });
  }

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

  public updateOverpayment(index: number): void {
    this.loanCalculateService.calculateLoanWithOverpayment(index);
  }
}