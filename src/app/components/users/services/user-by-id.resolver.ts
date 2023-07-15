import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "./user.service";
import {catchError, map, Observable, of, pipe, take, tap} from "rxjs";
import {User} from "../interfaces/users.interface";

export const UserByIdResolver: ResolveFn<Observable<any>> = (route, state) => {
  if (!route.params['id']) {
    return of({});
  }

  return inject(UserService).getUserById(route.params['id']).pipe(
    take(1),
  );
};
