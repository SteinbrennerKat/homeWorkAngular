import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {DatePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, TitleCasePipe} from "@angular/common";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {Pagination, User, UsersRequest, UserTable} from "../interfaces/users.interface";
import {UserService} from "../services/user.service";
import {BehaviorSubject, catchError, filter, map, of, startWith, Subject, switchMap, takeUntil} from "rxjs";
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
import {MatSortModule, Sort} from "@angular/material/sort";

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
    MatSortModule,
  ],
  providers: [
    UserService,
  ]
})
export class UsersListComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  private sort: Sort = {active: 'createdDate', direction: 'desc'};
  private pagination: Pagination = {pageSize: 3, pageIndex: 0};
  private userData: User[] = [];

  columns: string[] = [];
  dataSource = new MatTableDataSource<User>();
  displayedColumns: ColumnsInterface[] = COLUMNS_CONFIG;
  isLoading = false;
  tableMenuItemsEnum = TableMenuItemsEnum;
  tableMenuConfig: TableMenuItemsInterface[] = TABLE_MENU_ITEMS_CONFIG;
  totalData = 0;
  private tableChangeRequest$: BehaviorSubject<UsersRequest> = new BehaviorSubject({
    sort: this.sort,
    pagination: this.pagination,
  });

  constructor(
    private readonly service: UserService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  // @ts-ignore
  @ViewChild('paginator') paginator: MatPaginator;

  pageSizes = [10, 15, 20, 50, 100];

  ngOnInit(): void {
    this.displayedColumns.map(column => {
      this.columns.push(column.key);
    });
    this.initTableQuery()
  }

  ngAfterViewInit(): void {
    this.initPaginator();
    this.listenForPaginationChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.tableChangeRequest$.complete();
  }

  private initPaginator() {
    this.dataSource.paginator = this.paginator;
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
      this.service.deleteUser(user.id).pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.tableChangeRequest$.next({sort: this.sort, pagination: this.pagination});
      });
    });
  }

  onSortChangeRequest(sort: Sort) {
    this.sort = sort;
    this.tableChangeRequest$.next({sort, pagination: this.pagination});
  }

  private listenForPaginationChanges() {
    this.paginator.page.pipe(takeUntil(this.destroy$)).subscribe(v => {
      this.pagination.pageIndex = v.pageIndex;
      this.pagination.pageSize = v.pageSize;
      this.tableChangeRequest$.next(
        {
          sort: this.sort,
          pagination: {
            pageSize: v.pageSize,
            pageIndex: v.pageIndex,
          },
        });
    });
  }

  private initTableQuery(): void {
    this.tableChangeRequest$.pipe(
      takeUntil(this.destroy$),
      switchMap((req: UsersRequest) => {
        this.isLoading = true;
        return this.service.fetchUsers(req);
      }),
      map((res) => {
        if (res == null) return [];
        this.totalData = res.totalElements;
        this.isLoading = false;
        return res.users;
      })
    ).subscribe((response) => {
      this.userData = response;
      this.dataSource = new MatTableDataSource(this.userData);
      this.cdr.detectChanges();
    })
  }
}
