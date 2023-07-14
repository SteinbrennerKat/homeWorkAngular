import { Component } from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {AppNavigationEnum} from "./enums/app-navigation.enum";
import {SidenavListInterface} from "./interfaces/sidenav-list.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Home Work Angular';
  showFiller = false;
  links: SidenavListInterface[] = [
    {
      name: 'Home Page',
      isActive: false,
      route: AppNavigationEnum.WELCOME,
    },
    {
      name: 'Users',
      isActive: false,
      route: AppNavigationEnum.USERS,
    },
  ];


  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
  ) {
    this.initIconRegistry();
  }

  private initIconRegistry(): void {
    this.iconRegistry.addSvgIcon(
      'logo.svg',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/logo.svg'),
    );
  }
}
