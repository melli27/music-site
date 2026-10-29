import {Component, OnInit} from '@angular/core';
import {StatsService} from '../../services/spotify/stats/stats.service';
import {Artist} from '../../dtos/Artist';
import {TopItems} from '../../dtos/TopItems';
import {TimeRange} from '../../dtos/TimeRange';
import {NgForOf, NgIf} from '@angular/common';
import {Track} from '../../dtos/Track';
import {RecentTracks} from '../../dtos/RecentTracks';
import {firstValueFrom} from 'rxjs';
import { ChartOptions } from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-stats',
  imports: [
    NgForOf,
    NgIf,
    BaseChartDirective
  ],
  templateUrl: './stats.component.html',
  standalone: true,
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit {

  topArtists: TopItems<Artist> | null = null;
  topTracks: TopItems<Track> | null = null;
  recentTracks: RecentTracks | null = null;
  topArtist = "";
  limit: number = 5;
  sortedGenres: {genre: string,count: number,percentage: number}[] = [];

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
/*      datalabels: {
        color: '#fff', // Label text color
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels ? ctx.chart.data.labels[ctx.dataIndex] : '';
          return label; // Display the genre name
        },
        // font: {
        //   weight: 'bold',
        //   size: 8
        // }
      } */
    }
  };

  public pieChartLabels: string[] = ['genre', 'count', 'percentage'];
  public pieChartDatasets:{data:number[]}[] = [ {
    data: [33,33,33]
  } ];
  public pieChartLegend = false;
  public pieChartPlugins = []; //[DataLabelsPlugin];


  protected readonly TimeRange = TimeRange;


  constructor(private statsService: StatsService) {
  }

  ngOnInit() {
    this.getTopArtists(TimeRange.MEDIUM_TERM);
    this.getTopTracks(5, TimeRange.MEDIUM_TERM);
    this.getRecentTracks();
  }

  getTopTracks(limit: number, time: TimeRange) {
    this.statsService.getTopTracks(10, 0, time).subscribe({
      next: (track) => {
        this.topTracks = track as TopItems<Track>;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getRecentTracks() {
    this.statsService.getRecentTracks(6, 0, 0).subscribe({
      next: (tracks) => {
        this.recentTracks = tracks as RecentTracks;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getTopArtists(time: TimeRange) {
    this.statsService.getTopArtists(8, 0, time).subscribe({
      next: async (artists) => {
        this.topArtists = artists as TopItems<Artist>;
        this.topArtist = this.topArtists?.items[0].name;
        this.sortedGenres = await this.getTopGenres(); // Ensure sortedGenres is set correctly
        console.log(this.sortedGenres);

      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  async getTopGenres() {
    const genreCounts = new Map<string, number>();
    let totalGenres = 0;

    const genrePromises = this.topArtists?.items.map(async (artist) => {
      const genre = await this.getArtistGenre(artist.name);
      if (genre) {
        genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1);
        totalGenres++;
      }
    }) || [];

    await Promise.all(genrePromises); // Ensure all genre lookups complete

    const sortedGenres = Array.from(genreCounts.entries())
      .map(([genre, count]) => ({
        genre,
        count,
        percentage: (count / totalGenres) * 100
      }))
      .sort((a, b) => b.count - a.count);

    // Extract labels (genre names)
    this.pieChartLabels = sortedGenres.map(item => item.genre);

    // Extract data (percentages)
    this.pieChartDatasets = [{
      data: sortedGenres.map(item => item.percentage),
      // You can also add backgroundColor if you want specific colors
      // backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', ...]
    }];

    return sortedGenres;
  }

  //TODO not use subscribe
  async getArtistGenre(artistName: string): Promise<string> {
    try {
      const response: any = await firstValueFrom(this.statsService.searchArtistOnMusicBrainz(artistName));
      if (response.artists && response.artists.length > 0) {
        const artist: any = await firstValueFrom(this.statsService.getArtistGenres(response.artists[0].id));
        if (artist.genres && artist.genres.length > 0) {
          return artist.genres[0].name;
        }
      }
    } catch (error) {
      console.log(error);
    }
    return "";
  }
}
//     const genreCounts = new Map<string, number>();
//     let totalGenres = 0;
//
//     this.topArtists?.items.forEach(artist => {
//       if (artist.genres == null || artist.genres.length === 0) {
//         return
//       }
//       let genre = artist.genres[0];
//       if (genreCounts.has(genre)) {
//         genreCounts.set(genre, genreCounts.get(genre)! + 1);
//       } else {
//         genreCounts.set(genre, 1);
//       }
//       totalGenres++;
//     });
//
//     this.genreDistribution = Array.from(genreCounts.entries()).map(([genre, count]) => ({
//       genre,
//       percentage: (count / totalGenres) * 100
//     }));
//
//     // Sort by percentage in descending order
//     this.genreDistribution.sort((a, b) => b.percentage - a.percentage);
//     console.log(this.genreDistribution);
//   }
// }

//   getTopGenres() {
//     const genreCounts = new Map<string, number>();
//     let totalGenres = 0;
//
//     this.topTracks?.items.forEach(track => {
//       //track.artistGenres?.forEach(genre => {
//       console.log(track.external_ids);
//       let genre = track.artistGenres[0];
//       if (genreCounts.has(genre)) {
//         genreCounts.set(genre, genreCounts.get(genre)! + 1);
//       } else {
//         genreCounts.set(genre, 1);
//       }
//       totalGenres++;
//       //});
//     });
//
//     this.genreDistribution = Array.from(genreCounts.entries()).map(([genre, count]) => ({
//       genre,
//       percentage: (count / totalGenres) * 100
//     }));
//
//     // Sort by percentage in descending order
//     this.genreDistribution.sort((a, b) => b.percentage - a.percentage);
//     console.log(this.genreDistribution);
//   }
