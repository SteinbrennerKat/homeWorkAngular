import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./users.component";
import {CreateUserComponent} from "./create-user/create-user/create-user.component";
import {UsersRouteComponent} from "./users-route.component";

const Routes: Routes = [
  {
    path: '', component: UsersRouteComponent, children:[
      {
        path: '', component: UsersComponent,
      },
      {
        path: ':id', component: CreateUserComponent,
      },
    ],
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(Routes),
  ],
  declarations: [UsersRouteComponent],
  exports: [RouterModule],
})
export class UserModule {}
