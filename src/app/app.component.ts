import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoanFormComponent } from './loan-form/loan-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoanFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'loan-calculator';
}
