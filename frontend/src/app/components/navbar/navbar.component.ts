import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../services/theme/theme.service';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth/auth.service';
import {SpotifyService} from '../../services/spotify/spotify.service';
import {SpotifyUser} from '../../dtos/SpotifyUser';
import {UserProfileService} from "../../services/spotify/user/user-profile.service";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  signedIn: boolean = false;
  username: string = "USERNAME";
  spotifyUser: SpotifyUser | null = null;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private spotifyService: SpotifyService,
    private userProfileService: UserProfileService) {
  }

  ngOnInit() {
    const currentTheme = localStorage.getItem('theme') || 'theme-purple-dark';
    this.themeService.setTheme(currentTheme);
    this.checkAuthentication();
  }

  changeTheme(themeName: string) {
    this.themeService.setTheme(themeName);
  }

  //TODO different navbar logged in/logged out or asynch auth check auth
  checkAuthentication() {
    if (this.authService.isAuthenticated()) {
      this.signedIn = true;
      this.getUserProfile();
      // const cached = this.userProfileService.getUser();
      // if (cached) {
      //   this.spotifyUser = cached;
      // } else {
      //   this.getUserProfile();
      // }
    }
  }

  //TODO store profile in service to avoid multiple calls
  getUserProfile() {
    this.spotifyService.userProfile().subscribe({
      next: (user) => {
        this.spotifyUser = user as SpotifyUser;
        this.username = this.spotifyUser.display_name || "";
      },
      error: (error) => {
        this.signedIn = false;
      }
    });
  }
}

/*    this.spotifyService.userProfile().subscribe({
      next: (user) => {
        this.spotifyUser = user as SpotifyUser;
        this.username = this.spotifyUser.display_name || "";
      },
      error: (error) => {
        this.signedIn = false;
      }
    });*/
