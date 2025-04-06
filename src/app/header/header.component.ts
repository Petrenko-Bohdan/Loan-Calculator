import { Component, OnInit } from '@angular/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { translations } from '../shared/translations';
import { LanguageService } from '../services/language.service';
import { Translations } from '../models/translations.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LanguageSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
	currentLanguage: keyof Translations = '';
  translations: Translations = translations;

	constructor(private languageService: LanguageService) {}

	ngOnInit(): void {
		this.languageService.language$.subscribe((language) => {
			this.currentLanguage = language;
		});
	}
}
