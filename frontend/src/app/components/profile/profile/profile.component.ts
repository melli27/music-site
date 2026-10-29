import {Component, OnInit} from '@angular/core';
import {SpotifyUser} from '../../../dtos/SpotifyUser';
import {NgForOf, NgIf} from '@angular/common';
import {UserProfileService} from "../../../services/spotify/user/user-profile.service";
import {SpotifyService} from "../../../services/spotify/spotify.service";

@Component({
  selector: 'app-profile',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  profile!: SpotifyUser;

  constructor(private spotifyService: SpotifyService) {
  }

  ngOnInit() {
    this.getUserProfile();
  }

  //TODO store profile in service to avoid multiple calls
  getUserProfile() {
    this.spotifyService.userProfile().subscribe({
      next: (user) => {
        this.profile = user as SpotifyUser;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
