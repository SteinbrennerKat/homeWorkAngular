import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersListComponent} from "./users-list/users-list.component";
import {CreateUserComponent} from "./create-user/create-user/create-user.component";
import {UsersRouteComponent} from "./users-route.component";
import {UserByIdResolver} from "./services/user-by-id.resolver";
import {UserService} from "./services/user.service";
import {UserCreateResolverEnum} from "./enums/user-create-resolver.enum";

const Routes: Routes = [
  {
    path: '', component: UsersRouteComponent, children:[
      {
        path: '', component: UsersListComponent,
      },
      {
        path: 'create',
        component: CreateUserComponent,
      },
      {
        path: ':id/edit',
        component: CreateUserComponent,
        resolve: {[UserCreateResolverEnum.USER_BY_ID]: UserByIdResolver},
      },
      {
        path: ':id/details',
        component: CreateUserComponent,
        resolve: {userById: UserByIdResolver},
      },
    ],
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(Routes),
  ],
  providers: [UserService],
  declarations: [UsersRouteComponent],
  exports: [RouterModule],
})
export class UserModule {}
