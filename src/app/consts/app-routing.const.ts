import {Routes} from "@angular/router";
import {AppNavigationEnum} from "../enums/app-navigation.enum";
import {WelcomeComponent} from "../components/welcome/welcome.component";
import {NotFoundComponent} from "../components/not-found/not-found.component";
import {UserModule} from "../components/users/user.module";

export const AppRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: AppNavigationEnum.WELCOME, component: WelcomeComponent},
  {path: AppNavigationEnum.USERS, loadChildren: () => import('../components/users/user.module').then(m => m.UserModule)},
  {path: '**', component: NotFoundComponent},
];
