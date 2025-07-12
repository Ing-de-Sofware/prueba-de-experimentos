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
  setDarkMode(enabled: boolean): void {
    this.darkModeSubject.next(enabled);

    if (enabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  toggle(): void {
    const current = !this.darkModeSubject.value;
    this.darkModeSubject.next(current);
    localStorage.setItem('dark-mode', String(current));
    this.updateBodyClass(current);
  }

  get current(): boolean {
    return this.darkModeSubject.value;
  }

  private updateBodyClass(isDark: boolean): void {
    document.body.classList.toggle('dark-mode', isDark);
  }
}
