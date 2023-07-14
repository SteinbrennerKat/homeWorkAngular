import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  selector: 'users-router',
  templateUrl: './users-route.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersRouteComponent {}
