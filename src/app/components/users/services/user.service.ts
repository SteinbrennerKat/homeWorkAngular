import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {User, UserTable} from "../interfaces/users.interface";
import {UserRoleEnum} from "../enums/user-role.enum";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {

  constructor(
    private readonly http: HttpClient,
  ) {}
  fetchUsers(pageNumber: Number, pageSize: Number): Observable<UserTable> {
    return this.http.get<UserTable>('home-work-users/users-page');
  }

  deleteUser(id: string): void {

  }

  editUser(user: User): void {

  }

  getUserById(id: string): Observable<User> {
    console.log(id);

    // @ts-ignore
    return of(        {
      surname: 'Adminski',
      name: 'Adler',
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
