import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();

  private getStoredMode(): boolean {
    const stored = localStorage.getItem('dark-mode');
    const isDark = stored === 'true';
    this.updateBodyClass(isDark);
    return isDark;
  }
  setDarkMode(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    localStorage.setItem('dark-mode', String(isDark));
    this.updateBodyClass(isDark);
  }

  toggleDarkMode(): void {
    const currentValue = this.darkModeSubject.value;
    this.setDarkMode(!currentValue);
  }

  get current(): boolean {
    return this.darkModeSubject.value;
  }

  private updateBodyClass(isDark: boolean): void {
    document.body.classList.toggle('dark-mode', isDark);
  }
}
