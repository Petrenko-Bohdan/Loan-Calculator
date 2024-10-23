import { Component, Input} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LoanCalculatorService } from '../services/loan-calculator.service';




@Component({
  selector: 'app-payment-table',
  standalone: true,
  imports: [
    MatCardModule,
		MatTableModule
  ],
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss'],
})
export class PaymentTableComponent {
	@Input() payments: any[]= [];
	displayedColumns: string[] = ['month', 'capital', 'interest', 'principalInstalment', 'totalInstalment', 'overpayment', 'profit'];

	constructor(private route: ActivatedRoute, private loanCalculateService: LoanCalculatorService) {}

	
}
