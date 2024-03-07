import {inject, Injectable} from '@angular/core';
import {AngularFirestore, QueryDocumentSnapshot} from "@angular/fire/compat/firestore";
import {catchError, from, map} from "rxjs";
import {User} from "@shared/models/current-user.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private fireStore: AngularFirestore = inject(AngularFirestore);
  private usersCollection = this.fireStore.collection<User>('users');
  private pageSize: number = 5;
  private lastDoc: QueryDocumentSnapshot<User> | null = null;

  public loadUsers() {
    let query = this.usersCollection.ref.limit(this.pageSize);

    if (this.lastDoc) {
      query = query.startAfter(this.lastDoc);
    }

    return from(query.get()).pipe(
      map(snapshot => {
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
        this.lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;
        return users;
      }),
      catchError(error => {
        throw error;
      })
    );
  }
}
