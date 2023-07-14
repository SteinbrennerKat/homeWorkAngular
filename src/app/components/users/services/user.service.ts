import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {User, UserTable} from "../interfaces/users.interface";
import {UserRoleEnum} from "../enums/user-role.enum";

@Injectable()
export class UserService {
  fetchUsers(pageNumber: Number, pageSize: Number): Observable<UserTable> {
    return of({
      data: [
        {
          lastName: 'Adminski',
          firstName: 'Adler',
          id: '1234-1234-1234-1234-1234',
          createdAt: '2023-06-22T23:00:00.000Z',
          editedAt: 'null',
          email: 'adler@gmail.com',
          role: UserRoleEnum.ADMIN,
        },
        {
          lastName: 'Adminski',
          firstName: 'Adler',
          id: '1234-1234-1234-1234-1234',
          createdAt: '2023-06-22T23:00:00.000Z',
          editedAt: 'null',
          email: 'adler@gmail.com',
          role: UserRoleEnum.ADMIN,
        },
        {
          lastName: 'Adminski',
          firstName: 'Adler',
          id: '1234-1234-1234-1234-1234',
          createdAt: '2023-06-22T23:00:00.000Z',
          editedAt: 'null',
          email: 'adler@gmail.com',
          role: UserRoleEnum.ADMIN,
        },
        {
          lastName: 'Adminski',
          firstName: 'Adler',
          id: '1234-1234-1234-1234-1234',
          createdAt: '2023-06-22T23:00:00.000Z',
          editedAt: 'null',
          email: 'adler@gmail.com',
          role: UserRoleEnum.ADMIN,
        },
        {
          lastName: 'Adminski',
          firstName: 'Adler',
          id: '1234-1234-1234-1234-1234',
          createdAt: '2023-06-22T23:00:00.000Z',
          editedAt: 'null',
          email: 'adler@gmail.com',
          role: UserRoleEnum.ADMIN,
        },
        {
          lastName: 'Adminski',
          firstName: 'Adler',
          id: '1234-1234-1234-1234-1234',
          createdAt: '2023-06-22T23:00:00.000Z',
          editedAt: 'null',
          email: 'adler@gmail.com',
          role: UserRoleEnum.ADMIN,
        },
        {
          lastName: 'Adminski',
          firstName: 'Adler',
          id: '1234-1234-1234-1234-1234',
          createdAt: '2023-06-22T23:00:00.000Z',
          editedAt: 'null',
          email: 'adler@gmail.com',
          role: UserRoleEnum.ADMIN,
        }
      ],
      page: 1,
      per_page: 3,
      total: 7,
      total_pages: 0,
    })
  }

  deleteUser(id: string): void {

  }

  editUser(user: User): void {

  }

  getUserById(id: string): Observable<User> {
    console.log(id);

    // @ts-ignore
    return of(        {
      lastName: 'Adminski',
      firstName: 'Adler',
      id: '1234-1234-1234-1234-1234',
      createdAt: '2023-06-22T23:00:00.000Z',
      editedAt: 'null',
      email: 'adler@gmail.com',
      role: UserRoleEnum.ADMIN,
    })
  }

  createUser(user: User): void {

  }
}
