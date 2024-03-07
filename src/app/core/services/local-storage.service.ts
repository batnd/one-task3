import { Injectable } from '@angular/core';
import {User} from "@shared/models/current-user.interface";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private loggedUserKey: string = 'user';
  public saveUser(currentUser: User): void {
    localStorage.setItem(this.loggedUserKey, JSON.stringify(currentUser));
  }

  public loadUser(): User | null {
    const user: string | null = localStorage.getItem(this.loggedUserKey);
    if (user) return JSON.parse(user);
    else return null;
  }

  public isCurrentUserLoggedIn(): boolean {
    const userExist: User | null = this.loadUser();
    return !!userExist;
  }

  public removeUser(): void {
    localStorage.removeItem(this.loggedUserKey);
  }
}
