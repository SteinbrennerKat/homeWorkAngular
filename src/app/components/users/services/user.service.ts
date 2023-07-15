import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User, UsersRequest, UserTable} from "../interfaces/users.interface";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {
  private readonly primaryPath = 'home-work-users/';
  private readonly entityPath = 'user';

  constructor(
    private readonly http: HttpClient,
  ) {}
  fetchUsers(requestParams: UsersRequest): Observable<UserTable> {
    const {pagination, sort} = requestParams;
    return this.http.get<UserTable>(
      `${this.primaryPath}users-page?page=${pagination.pageIndex
      }&size=${pagination.pageSize
      }&sortOrder=${sort.active
      }&direction=${sort.direction.toUpperCase()}`,
    );
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete(`${this.primaryPath}${this.entityPath}/${id}`);
  }

  editUser(user: User, id: string): Observable<User> {
    return this.http.put(`${this.primaryPath}${this.entityPath}/${id}`, user);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.primaryPath}${this.entityPath}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post(`${this.primaryPath}${this.entityPath}`, user);
  }
}
