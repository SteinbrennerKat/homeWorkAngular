import {Routes} from "@angular/router";
import {AppNavigationEnum} from "../enums/app-navigation.enum";
import {UsersComponent} from "../components/users/users.component";
import {WelcomeComponent} from "../components/welcome/welcome.component";
import {NotFoundComponent} from "../components/not-found/not-found.component";

export const AppRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: AppNavigationEnum.WELCOME, component: WelcomeComponent},
  {path: AppNavigationEnum.USERS, loadComponent: () => UsersComponent},
  {path: '**', component: NotFoundComponent},
];
