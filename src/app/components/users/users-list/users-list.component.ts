import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {DatePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, TitleCasePipe} from "@angular/common";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {User, UserTable} from "../interfaces/users.interface";
import {UserService} from "../services/user.service";
import {catchError, filter, map, of, startWith, switchMap} from "rxjs";
import {ColumnsInterface} from "../interfaces/columns.interface";
import {COLUMNS_CONFIG} from "../consts/columns.config";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {TableMenuItemsInterface} from "../interfaces/table-menu-items.interface";
import {TABLE_MENU_ITEMS_CONFIG} from "../consts/table-menu-items.config";
import {TableMenuItemsEnum} from "../enums/table-menu-items.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTableModule,
    NgForOf,
    MatProgressBarModule,
    MatPaginatorModule,
    NgIf,
    TitleCasePipe,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    NgSwitchCase,
    NgSwitch,
    DatePipe,
  ],
  providers: [
    UserService,
  ]
})
export class UsersListComponent implements OnInit, AfterViewInit {
  columns: string[] = [];
  displayedColumns: ColumnsInterface[] = COLUMNS_CONFIG;
  userTable: UserTable = {
    users: [],
    number: 0,
    size: 3,
    totalPages: 0,
    totalElements: 0,
  };
  tableMenuItemsEnum = TableMenuItemsEnum;
  tableMenuConfig: TableMenuItemsInterface[] = TABLE_MENU_ITEMS_CONFIG;
  totalData = 0;
  userData: User[] = [];
  dataSource = new MatTableDataSource<User>();

  isLoading = false;

  constructor(
    private readonly service: UserService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  // @ts-ignore
  @ViewChild('paginator') paginator: MatPaginator;

  pageSizes = [3, 5, 10, 15, 20, 50];

  ngOnInit(): void {
    this.displayedColumns.map(column => {
      this.columns.push(column.key);
    })
  }

  ngAfterViewInit(): void {
    this.fetch();
  }

  private fetch() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.getTableData$(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          ).pipe(catchError(() => of(null)));
        }),
        map((res) => {
          if (res == null) return [];
          this.totalData = res.totalElements;
          this.isLoading = false;
          return res.users;
        })
      )
      .subscribe((response) => {
        this.userData = response;
        this.dataSource = new MatTableDataSource(this.userData);
        this.cdr.detectChanges();
      });
  }

  getTableData$(pageNumber: number, pageSize: number) {
    return this.service.fetchUsers(pageNumber, pageSize);
  }

  onActionButtonClick(value: TableMenuItemsEnum, user: User = {}): void {
    switch (value) {
      case TableMenuItemsEnum.EDIT:
        this.routeToEditPage(TableMenuItemsEnum.EDIT, user);
        break;
      case TableMenuItemsEnum.DELETE:
        this.openDeleteConfirmationDialog(user);
        break;
      case TableMenuItemsEnum.CREATE:
        this.routeToEditPage(TableMenuItemsEnum.CREATE);
        break;
      case TableMenuItemsEnum.DETAILS:
        this.routeToEditPage(TableMenuItemsEnum.DETAILS, user);
    }
  }

  private routeToEditPage(pageType: string, user?: User): void {
    if (user?.id) {
      this.router.navigate([user.id, pageType], {relativeTo: this.route}).then()
    } else {
      this.router.navigate([pageType], {relativeTo: this.route}).then()
    }

  }

  private openDeleteConfirmationDialog(user: User): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '650px',
      data: user,
    }).afterClosed().pipe(filter(v => !!v)).subscribe(res => {
      this.service.deleteUser(user.id).subscribe(res => {});
    });
  }
}
