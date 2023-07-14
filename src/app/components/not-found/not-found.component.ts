import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {AppNavigationEnum} from "../../enums/app-navigation.enum";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    MatButtonModule,
    RouterLink
  ]
})
export class NotFoundComponent {
  homeLink = AppNavigationEnum.WELCOME;
}
