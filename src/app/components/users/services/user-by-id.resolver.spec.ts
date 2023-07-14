import {TestBed} from '@angular/core/testing';
import {ResolveFn} from '@angular/router';

import {UserByIdResolver} from './user-by-id.resolver';
import {Observable} from "rxjs";
import {User} from "../interfaces/users.interface";

describe('userByIdResolver', () => {
  const executeResolver: ResolveFn<Observable<User>> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => UserByIdResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
