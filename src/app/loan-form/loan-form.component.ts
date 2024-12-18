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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { translations } from '../shared/translations';
import { LanguageService } from '../services/language.service';
import { Translations } from '../models/translations.model';


@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
		MatSlideToggleModule,
		
  ],
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss'],
})

export class LoanFormComponent implements OnInit {
  loanform!: FormGroup;
  toggleControl = true;
	currentLanguage: keyof Translations = '';
  translations: Translations = translations;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loanCalculatorService: LoanCalculatorService,
		private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.initForm();

		this.languageService.language$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  private initForm(): void {
    this.loanform = this.fb.group({
      loanAmount: ['', Validators.required],
      interestRate: ['', Validators.required],
      loanTerm: [{ value:'', disabled: false}],
			monthlyPayment: [{ value:'', disabled: true}],
    });
  }

	public onToggleChange(): void {
		if (this.toggleControl){
			this.loanform.get('loanTerm')?.enable();
			this.loanform.get('monthlyPayment')?.disable();
		} else {
			this.loanform.get('loanTerm')?.disable();
			this.loanform.get('monthlyPayment')?.enable();
		}
	}

	public toggleChanged(): void {
		this.toggleControl = !this.toggleControl;
		this.onToggleChange();
	}

  public calculateLoan(): void {
		if (this.loanform.invalid) {
      this.loanform.markAllAsTouched();
      return;
    }

		const { loanAmount, interestRate, loanTerm, monthlyPayment } =
      this.loanform.value;

			const formData = {
				loanAmount: loanAmount,
				interestRate: interestRate,
				loanTerm: loanTerm,
				monthlyPayment: monthlyPayment
			};

			this.loanCalculatorService.calculateLoan(	formData, this.toggleControl)

    this.router.navigate(['/payment-table']);
  }
}
