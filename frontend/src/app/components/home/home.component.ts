import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify/spotify.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) {
  }

  ngOnInit() {
  }
}
