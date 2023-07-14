import {UserRoleEnum} from "../enums/user-role.enum";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoleEnum;
  createdAt: string;
  editedAt: string;
}

export interface UserTable {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
