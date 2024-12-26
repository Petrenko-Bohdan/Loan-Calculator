import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { loanHistoryReducer } from './app/store/loan-history/loan-history.reducer';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideStore(),
    provideState('loanHistory', loanHistoryReducer),
    provideStoreDevtools({ maxAge: 25 }),
  ],
}).catch((err) => console.error(err));