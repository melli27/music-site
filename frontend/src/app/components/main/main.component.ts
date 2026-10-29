import { Component, OnInit } from '@angular/core';
import {SpotifyUser} from '../../dtos/SpotifyUser';
import {UserProfileService} from '../../services/spotify/user/user-profile.service';
import { SpotifyService } from "../../services/spotify/spotify.service";
import {StatsService} from '../../services/spotify/stats/stats.service';
import { CommonModule } from "@angular/common";
import {RouterLink} from '@angular/router';
import {PlayHistoryItem} from '../../dtos/BaseDtos';
import {RecentTracks} from '../../dtos/RecentTracks';
import {Playlist} from '../../dtos/Playlist';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  spotifyUser!: SpotifyUser;
  recentTracks: PlayHistoryItem[] = [];
  playlists: Playlist[] = [];
  playlistTotal = 0;
  recentLoading = true;
  playlistsLoading = true;
  recentError = false;
  playlistsError = false;

  constructor(private userProfileService: UserProfileService,
              private spotifyService: SpotifyService,
              private statsService: StatsService) {}

  ngOnInit() {
    this.getUserProfile();
    this.getRecentTracks();
    this.getPlaylists();
  }

    //TODO store profile in service to avoid multiple calls
    getUserProfile() {
      this.spotifyService.userProfile().subscribe({
        next: (user) => {
          this.spotifyUser = user as SpotifyUser;
        },
        error: (error) => {
          console.error(error);
        }
      })
    }

  getRecentTracks() {
    this.statsService.getRecentTracks(5, 0, 0).subscribe({
      next: (data) => {
        this.recentTracks = (data as RecentTracks).items ?? [];
        this.recentLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.recentError = true;
        this.recentLoading = false;
      }
    });
  }

  getPlaylists() {
    this.spotifyService.getPlaylists(4).subscribe({
      next: (data) => {
        this.playlists = data.items ?? [];
        this.playlistTotal = data.total;
        this.playlistsLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.playlistsError = true;
        this.playlistsLoading = false;
      }
    });
  }

  artistNames(item: PlayHistoryItem): string {
    return (item.track?.artists ?? []).map(a => a.name).join(', ');
  }

  // Smallest image that is still at least minSize px, so we don't load huge covers.
  imageUrl(images: { url: string; width: number | null }[] | null | undefined, minSize = 0): string | null {
    if (!images || images.length === 0) {
      return null;
    }
    const sorted = [...images].sort((a, b) => (a.width ?? 0) - (b.width ?? 0));
    return (sorted.find(i => (i.width ?? 0) >= minSize) ?? sorted[sorted.length - 1]).url;
  }

  timeAgo(playedAt: string | null | undefined): string {
    if (!playedAt) {
      return '';
    }
    const minutes = Math.floor((Date.now() - new Date(playedAt).getTime()) / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} h ago`;
    const days = Math.floor(hours / 24);
    return `${days} d ago`;
  }
}
