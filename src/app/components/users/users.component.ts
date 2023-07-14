import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {User, UserTable} from "./interfaces/users.interface";
import {UserService} from "./services/user.service";
import {catchError, map, of, startWith, switchMap} from "rxjs";
import {ColumnsInterface} from "./interfaces/columns.interface";
import {COLUMNS_CONFIG} from "./consts/columns.config";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {TableMenuItemsInterface} from "./interfaces/table-menu-items.interface";
import {TABLE_MENU_ITEMS_CONFIG} from "./consts/table-menu-items.config";
import {TableMenuItemsEnum} from "./enums/table-menu-items.enum";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
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
  ],
  providers: [
    UserService,
  ]
})
export class UsersComponent implements OnInit, AfterViewInit {
  columns: string[] = [];
  displayedColumns: ColumnsInterface[] = COLUMNS_CONFIG;
  userTable: UserTable = {
    data: [],
    page: 0,
    per_page: 3,
    total_pages: 0,
    total: 0,
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
        map((empData) => {
          if (empData == null) return [];
          this.totalData = empData.total;
          this.isLoading = false;
          return empData.data;
        })
      )
      .subscribe((response) => {
        this.userData = response;
        this.dataSource = new MatTableDataSource(this.userData);
      });
  }

  getTableData$(pageNumber: Number, pageSize: Number) {
    return this.service.fetchUsers(pageNumber, pageSize);
  }

  onActionButtonClick(event: MouseEvent, user: User, value: TableMenuItemsEnum): void {
    switch (value) {
      case TableMenuItemsEnum.EDIT:
        this.routeToCreatePage(user);
    }
  }

  private routeToCreatePage(user: User): void {
    this.router.navigate([user.id], {relativeTo: this.route}).then()
  }
}
