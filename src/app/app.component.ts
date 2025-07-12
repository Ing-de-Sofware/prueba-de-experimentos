import { Component } from '@angular/core';
import {Router, NavigationEnd, RouterOutlet} from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserTypeService } from './shared/services/user-type.service';
import { UserType } from './shared/model/user-type.model';
import {
  HeaderForUserTypeServiceComponent
} from "./shared/components/header-for-user-type-service/header-for-user-type-service.component";
import {FooterContentComponent} from "./public/components/footer-content/footer-content.component";
import {DarkModeService} from "./shared/services/dark-mode.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'frontend_version0_0';
  isAuthRoute  = false;
  userType: UserType | null = null;
  isDarkMode = false;



  constructor(
    private userTypeService: UserTypeService,
    private router: Router,
    private darkModeService: DarkModeService,
    public translate: TranslateService
  ) {
    this.userTypeService.userType$.subscribe(type => this.userType = type);

    // Escucha los cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const path = event.urlAfterRedirects.split('?')[0];
        this.isAuthRoute = ['/login', '/register', '/forgot-password', '/selectRole'].some(route => path.startsWith(route));

      });

    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('es');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit() {
    this.darkModeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
      document.body.classList.toggle('dark-mode', isDark);
    });
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  showMedicalHistoryPage: boolean = false;

  navigateToMedicalHistory() {
    this.showMedicalHistoryPage = true;
  }

  public throwTestError(): void {
    throw new Error("Sentry Test Error");
  }

}
