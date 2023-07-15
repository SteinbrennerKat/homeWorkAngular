import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {UserRoleEnum} from "../../enums/user-role.enum";
import {DatePipe, LocationStrategy, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {TableMenuItemsEnum} from "../../enums/table-menu-items.enum";
import {User} from "../../interfaces/users.interface";
import {UserCreateResolverEnum} from "../../enums/user-create-resolver.enum";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {UserService} from "../../services/user.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";

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
    MatProgressBarModule,
  ]
})
export class CreateUserComponent implements OnInit, OnDestroy {
  title: string = '';
  user: User;
  form: FormGroup;
  userRolesList = [UserRoleEnum.USER, UserRoleEnum.ADMIN]
  readonly = false;
  isLoading = false;
  private destroy$: Subject<void> = new Subject();

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  private initForm() {
    this.form = this.fb.nonNullable.group({
      email: '',
      username: '',
      name: '',
      surname: '',
      role: '',
      age: '',
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
    this.isLoading = true;
    if (this.user) {
      this.service.editUser(this.form.value, this.user.id).pipe(
        takeUntil(this.destroy$),
      ).subscribe(res => {
        this.isLoading = false;
        this.router.navigate(['users']).then();
      });
    } else {
      this.service.createUser(this.form.value).pipe(
        takeUntil(this.destroy$),
        ).subscribe(res => {
        this.isLoading = false;
        this.router.navigate(['users']).then();
      });
    }


  }

  onFormCancel(): void {
    this.location.back();
  }
}
