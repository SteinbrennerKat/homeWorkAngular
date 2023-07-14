import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {UserRoleEnum} from "../../enums/user-role.enum";
import {DatePipe, LocationStrategy, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {TableMenuItemsEnum} from "../../enums/table-menu-items.enum";
import {User} from "../../interfaces/users.interface";
import {UserCreateResolverEnum} from "../../enums/user-create-resolver.enum";
import {BehaviorSubject} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {UserService} from "../../services/user.service";

interface UserFormInterface {
  firstName: AbstractControl<string>;
  lastName: AbstractControl<string>;
  email: AbstractControl<string>;
  role: AbstractControl<string>;
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgForOf,
    TitleCasePipe,
    DatePipe,
    NgIf,
    MatButtonModule,
  ]
})
export class CreateUserComponent implements OnInit {
  title: string = '';
  user: User;
  // @ts-ignore
  form: FormGroup;
  userRolesList = [UserRoleEnum.USER, UserRoleEnum.ADMIN]
  readonly: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly location: LocationStrategy,
    private readonly service: UserService,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.initRouteParams();
    this.getUserData();
    if (this.user) {
      this.updateFormWithUserData();
    }
  }


  private initForm() {
    this.form = this.fb.nonNullable.group({
      email: '',
      firstName: '',
      lastName: '',
      role: ''
    })
  }

  private initRouteParams(): void {
    const routes = this.router.url.split('/');
    const lastRoute = routes[routes.length - 1];

    switch (lastRoute) {
      case TableMenuItemsEnum.EDIT:
        this.title = 'Edit User';
        break;
      case TableMenuItemsEnum.DETAILS:
        this.title = 'User`s Profile';
        this.readonly = true;
        break;
      default:
        this.title = 'Create New User';
        break;
    }
  }

  private getUserData(): void {
    this.user = (this.route.data as
      BehaviorSubject<Record<UserCreateResolverEnum.USER_BY_ID, User>>)?.
    getValue().userById;
  }

  private updateFormWithUserData(): void {
    this.form.patchValue(this.user);
  }

  onEditClick() {
    this.router.navigate(['../edit'], {relativeTo: this.route});
  }

  onFormSubmit(): void {
    if (this.user) {
      this.service.editUser(this.user);
    } else {
      this.service.createUser(this.user);
    }


  }

  onFormCancel(): void {
    this.location.back();
  }
}
