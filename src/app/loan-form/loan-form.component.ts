import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatSlideToggleModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss'],
})
export class LoanFormComponent implements OnInit {
  loanform!: FormGroup;
  toggleControl = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loanform = this.fb.group({
      loanAmount: ['', [Validators.required, this.decimalPointValidator]],
      annualInterestRate: [
        '',
        [Validators.required, this.decimalPointValidator],
      ],
      loanPeriod: [{ value: '', disabled: true }],
      monthlyPaymentAmount: [
        { value: '', disabled: true },
        [this.decimalPointValidator],
      ],
    });

    this.onToggleChange();
  }

  decimalPointValidator(
    control: AbstractControl
  ): { [key: string]: string } | null {
    const value = control.value;

    if (value === null || value === '') return null;

    const regex = /^\d+([.,]\d{0,2})?$/;
    return regex.test(value)
      ? null
      : { invalidDecimal: 'Invalid decimal value' };
  }

  onToggleChange(): void {
    if (this.toggleControl) {
      this.loanform.get('loanPeriod')?.enable();
      this.loanform.get('monthlyPaymentAmount')?.disable();
    } else {
      this.loanform.get('loanPeriod')?.disable();
      this.loanform.get('monthlyPaymentAmount')?.enable();
    }
  }

  toggleChanged() {
    this.toggleControl = !this.toggleControl;
    this.onToggleChange();
  }
}
