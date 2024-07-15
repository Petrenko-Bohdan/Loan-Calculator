NgModule
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { LoanFormComponent } from './loan-form/loan-form.component';


export const routes: Routes = [
	{path:'', component: LoanFormComponent},
	{path:'loan-form', component: LoanFormComponent},
];
