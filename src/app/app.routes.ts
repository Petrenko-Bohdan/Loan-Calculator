import { Routes } from '@angular/router';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { PaymentTableComponent } from './payment-table/payment-table.component';

export const routes: Routes = [
	{path:'', component: LoanFormComponent},
	{path:'loan-form', component: LoanFormComponent},
	{path:'payment-table', component: PaymentTableComponent}
];
