import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {SignUpRequest} from "@shared/models/signup-request.interface";
import {catchError, from, map, Observable, of, switchMap, throwError} from "rxjs";
import {User} from "@shared/models/current-user.interface";
import {LoginRequest} from "@shared/models/login-request.interface";
import {LocalStorageService} from "@core/services/local-storage.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Store} from "@ngrx/store";
import {authActions} from "@store/auth/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private store: Store = inject(Store);
  private firestore: AngularFirestore = inject(AngularFirestore);
  private afAuth: AngularFireAuth = inject(AngularFireAuth);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  public signupUser(userData: SignUpRequest) {
    return from(this.afAuth.createUserWithEmailAndPassword(userData.email, userData.password)).pipe(
      switchMap((result) => {
        const uid: string | undefined = result.user?.uid;
        return this.firestore.collection('users').doc(uid).set({
          name: userData.name,
          email: userData.email,
          id: uid
        }).then(() => ({
          name: userData.name,
          email: userData.email,
          id: uid
        }));
      }),
      catchError(error => {
        console.log('Error during signup:', error);
        return throwError(() => error);
      })
    )
  }

  public loginUser(userData: LoginRequest): Observable<User | null> {
    return from(this.afAuth.signInWithEmailAndPassword(userData.email, userData.password)).pipe(
      switchMap((userCredential) => {
        const uid: string | undefined = userCredential.user?.uid;
        if (!uid) return throwError(() => new Error('User UID is not found'));

        return this.firestore.collection('users').doc(uid).valueChanges().pipe(
          map((userData: any) => {
            if (!userData) return null;

            return {
              name: userData['name'],
              email: userData['email'],
              id: uid
            }
          })
        );
      }),
      catchError(err => {
        return throwError(() => new Error('Authentication failed'));
      })
    )
  }

  // public getCurrentUser() {
  //   return this.afAuth.authState.pipe(
  //     switchMap(user => {
  //       if (user) return this.firestore.collection('users').doc(user.uid).valueChanges().pipe(
  //         map((userData) => userData as CurrentUser | null)
  //       );
  //       else return of(null);
  //     })
  //   ).subscribe((userData: CurrentUser | null) => {
  //     if (userData) {
  //       const currentUser: CurrentUser = {
  //         name: userData.name,
  //         email: userData.email,
  //         id: userData.id
  //       }
  //       this.store.dispatch(authActions.getCurrentUserSuccess({user: currentUser}));
  //     }
  //     else {
  //       this.store.dispatch(authActions.getCurrentUserFailure())
  //     }
  //   })
  // }
}
