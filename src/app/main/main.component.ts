import { Component, OnInit } from '@angular/core';
import {ItunesService} from '../itunes.service';
import {ArtistModel} from './artist.model';
import {AlbumModel} from './album.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  searchKeyword = '';
  artists: ArtistModel[] = [];
  albums: AlbumModel[] = [];
  recentSearches: string[] = localStorage.getItem('recentSearches') ? JSON.parse(localStorage.getItem('recentSearches')) : [];

  constructor(private service: ItunesService) { }

  onSearch() {
    this.service.search(this.searchKeyword)
      .subscribe((res: any) => {
        this.addRecentSearch();
        this.initialize();
        const result: any[] = res.results;
        result.forEach(r => {
          const artist = {} as ArtistModel;

          if (this.artists.filter(a => a.artistId === r.artistId).length === 0) {
            artist.artistId = r.artistId;
            artist.artistName = r.artistName;
            artist.thumbnail = r.artworkUrl100;
            this.artists.push(artist);
          }
          const album = {} as AlbumModel;

          if (this.albums.filter(a => a.collectionId === r.collectionId).length === 0) {
            album.collectionId = r.collectionId;
            album.collectionName = r.collectionName;
            album.thumbnail = r.artworkUrl100;
            this.albums.push(album);
          }

        });
        console.log(this.artists);

      });
  }
  addRecentSearch() {
    this.recentSearches.unshift(this.searchKeyword);
    this.recentSearches = this.recentSearches.slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }
  initialize() {
    this.artists = [];
    this.albums = [];
  }

  ngOnInit(): void {
    this.initialize();
  }

}
