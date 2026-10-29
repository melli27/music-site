import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { SpotifyUser } from "../../../dtos/SpotifyUser";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private userSubject = new BehaviorSubject<SpotifyUser | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('spotifyUser');
    if (saved) this.userSubject.next(JSON.parse(saved));
  }

  setUser(user: SpotifyUser) {
    this.userSubject.next(user);
    localStorage.setItem('spotifyUser', JSON.stringify(user));
  }

  getUser(): SpotifyUser | null {
    return this.userSubject.value;
  }
}
