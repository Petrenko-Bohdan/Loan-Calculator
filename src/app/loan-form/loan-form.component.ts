import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanCalculatorService } from '../services/loan-calculator.service';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
		
  ],
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss'],
})
export class LoanFormComponent implements OnInit {
  loanform!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private loanCalculatorService: LoanCalculatorService) {}

  ngOnInit(): void {
    this.loanform = this.fb.group({
      loanAmount: ['', Validators.required],
      interestRate: ['', Validators.required],
      loanTerm: ['', Validators.required],
    });
  }

  public calculateLoan(): void {
    if (this.loanform.invalid){
      this.loanform.markAllAsTouched();
      return;
    }
    const loanAmount = this.loanform.get('loanAmount')?.value;
    const annualInterestRate = this.loanform.get('annualInterestRate')?.value;
    const loanPeriod = this.loanform.get('loanPeriod')?.value;
    
		this.loanCalculatorService.calculateLoan(loanAmount, annualInterestRate, loanPeriod);
		
    this.router.navigate(['/payment-table']);
  }
}
