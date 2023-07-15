import {UserRoleEnum} from "../enums/user-role.enum";
import {Sort} from "@angular/material/sort";

export interface User {
  id?: string;
  name?: string;
  surname?: string;
  username?: string;
  age?: number;
  email?: string;
  role?: UserRoleEnum;
  createdDate?: string;
  editedDate?: string;
}

export interface UserTable {
  users: User[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface Pagination {
  pageSize: number;
  pageIndex: number;
}

export interface UsersRequest {
  sort: Sort;
  pagination: Pagination;
}
