import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {provideState, provideStore, StoreModule} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {provideHttpClient} from "@angular/common/http";
import * as AuthEffects from '@store/auth/auth.effects';
import * as UsersEffects from '@store/users/users.effects';
import {usersFeature, } from "@store/users/users.reducers";
import {authFeature} from "@store/auth/auth.reducers";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule,
    ),
    provideStore({
      Auth: authFeature.reducer,
      Users: usersFeature.reducer
    }),
    provideEffects([AuthEffects, UsersEffects]),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()}),
    provideHttpClient()
  ]
};
