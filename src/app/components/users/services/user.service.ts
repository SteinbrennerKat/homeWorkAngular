import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {User, UserTable} from "../interfaces/users.interface";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {
  private readonly primaryPath = 'home-work-users/';
  private readonly entityPath = 'user';

  constructor(
    private readonly http: HttpClient,
  ) {}
  fetchUsers(pageNumber: number, pageSize: number): Observable<UserTable> {
    return this.http.get<UserTable>(`${this.primaryPath}users-page?page=${pageNumber - 1}&size=${pageSize}`);
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
