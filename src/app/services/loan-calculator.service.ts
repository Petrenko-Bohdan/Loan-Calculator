import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class LoanCalculatorService {
  private paymentSubject = new BehaviorSubject<any[]>([]);
  payments$ = this.paymentSubject.asObservable();
  private loanAmount!: number;
  private interestRate!: number;
  private loanTerm!: number;
  private monthlyPaymentAmount!: number;

  private formatDate() {
    const currentDate = new Date();
    return format(currentDate, 'MM/yyyy');
  }

  private get monthlyInterestRate(): number {
    return this.interestRate / 12 / 100;
  }

  private calculateMonthlyPaymentAmount(): number {
    return (
      (this.loanAmount! * this.monthlyInterestRate) /
      (1 - Math.pow(1 + this.monthlyInterestRate, -this.loanTerm!))
    );
  }

  public calculateLoan(
    loanAmount: number,
    interestRate: number,
    loanTerm: number
  ): void {
    this.loanAmount = loanAmount;
    this.interestRate = interestRate;
    this.loanTerm = loanTerm;
    this.monthlyPaymentAmount = this.calculateMonthlyPaymentAmount();

    const payments = [];
    let balance = this.loanAmount;
    let currentDate = new Date();

    for (let i = 0; i < this.loanTerm; i++) {
      const monthlyPayment = this.monthlyPaymentAmount;
      const interest = this.loanAmount * this.monthlyInterestRate;
      const principalInstalment = monthlyPayment - interest;

      this.loanAmount -= principalInstalment;

      payments.push({
        month: this.formatDate(),
        capital: balance.toFixed(2),
        interest: interest.toFixed(2),
        principalInstalment: principalInstalment.toFixed(2),
        overpayment: 0,
        monthlyPayment: monthlyPayment.toFixed(2),
      });

      currentDate.setMonth(currentDate.getMonth() + 1);
      balance -= principalInstalment;
    }
    this.paymentSubject.next(payments);
  }

  public calculateLoanWithOverpayment(index: number): void {
    const payments = this.paymentSubject.getValue();
    let balance =
      parseFloat(payments[index].capital) -
      parseFloat(payments[index].principalInstalment) -
      parseFloat(payments[index].overpayment);

    for (let i = index + 1; i < payments.length; i++) {
      const interest = balance * this.monthlyInterestRate;
      const principalInstalment = parseFloat(payments[i].monthlyPayment) - interest;
      const overpayment = parseFloat(payments[i].overpayment);

      payments[i] = {
        month: this.formatDate(),
        capital: balance.toFixed(2),
        interest: interest.toFixed(2),
        principalInstalment: principalInstalment.toFixed(2),
        overpayment: overpayment,
        monthlyPayment: (principalInstalment + interest).toFixed(2),
      };

      balance -= (principalInstalment + overpayment);
    }

    this.paymentSubject.next(payments);
  }
}