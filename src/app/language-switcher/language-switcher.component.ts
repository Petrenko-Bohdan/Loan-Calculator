import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { translations } from '../shared/translations';
import { Translations } from '../models/translations.model';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {
  currentLanguage: keyof Translations = '';
	translations: Translations = translations;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.language$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  changeLanguage(language: string) {
    this.languageService.setLanguage(language);
  }
}