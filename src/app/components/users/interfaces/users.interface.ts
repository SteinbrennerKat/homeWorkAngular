import {UserRoleEnum} from "../enums/user-role.enum";

export interface User {
  id?: string;
  name?: string;
  surname?: string;
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
