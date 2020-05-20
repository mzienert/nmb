import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  public isAuthenticated(): Observable<boolean> {
    return from(Auth.currentAuthenticatedUser())
      .pipe(
        map(result => {
          this.loggedIn.next(true);
          return true;
        }),
        catchError(error => {
          this.loggedIn.next(false);
          return of(false);
        })
      );
  }

  public signIn(credentials): Observable<any> {
    const email = credentials.email.toLowerCase();
    return from(Auth.signIn(email, credentials.password))
      .pipe(
        tap(() => this.loggedIn.next(true))
      );
  }

  public newPassword(user, pass): Observable<any> {
    const requiredAttributes = {};
    return from(Auth.completeNewPassword(user, pass, requiredAttributes))
      .pipe(
        tap( () => this.loggedIn.next(false))
      );
  }

  public signOut() {
    from(Auth.signOut())
      .subscribe(
        result => {
          this.loggedIn.next(false);
          this.router.navigate(['/login']);
        },
        error => console.log(error)
      );
  }

}
