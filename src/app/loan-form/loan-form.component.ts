import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
		MatButtonModule,
		MatIconModule,
		MatDividerModule
  ],
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss'],
})
export class LoanFormComponent implements OnInit {
  loanform!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loanform = this.fb.group({
      loanAmount: ['', Validators.required],
      interestRate: ['', Validators.required],
      loanTerm: ['', Validators.required],
    });
  }

  public calculateLoan(): void {
    if (this.loanform.valid) {
      const loanAmount = this.loanform.get('loanAmount')?.value;
      const interestRate = this.loanform.get('interestRate')?.value;
      const loanTerm = this.loanform.get('loanTerm')?.value;

      this.router.navigate(['/payment-table']);
    } else {
      this.loanform.markAllAsTouched();
    }
  }
}
