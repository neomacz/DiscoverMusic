import { Component, OnInit } from '@angular/core';
import {ItunesService} from '../itunes.service';
import {ArtistModel} from '../model/artist.model';
import {AlbumModel} from '../model/album.model';
import {createFeatureSelector, createSelector, Store} from '@ngrx/store';
import * as fromFavorite from '../favorite/favorite.reducer';

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
  favorites;

  constructor(private service: ItunesService, private store: Store<any>) { }

  onSearch() {
    this.service.search(this.searchKeyword)
      .subscribe((res: any) => {
        this.addRecentSearch();
        this.initialize();
        const result: any[] = res.results;
        result.forEach(r => {
          const artist = {} as ArtistModel;

          if (r.artistId && this.artists.filter(a => a.artistId === r.artistId).length === 0) {
            artist.artistId = r.artistId;
            artist.artistName = r.artistName;
            artist.thumbnail = r.artworkUrl100;
            this.artists.push(artist);
          }
          const album = {} as AlbumModel;

          if (r.collectionId && this.albums.filter(a => a.collectionId === r.collectionId).length === 0) {
            album.collectionId = r.collectionId;
            album.collectionName = r.collectionName;
            album.thumbnail = r.artworkUrl100;
            this.albums.push(album);
          }

        });
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
    this.store.select(selectAllFavorite).subscribe(o => {
      this.favorites = o;
    });
  }

}

export const selectFavoriteState = createFeatureSelector<fromFavorite.State>('favorite');

export const selectAllFavorite = createSelector(
  selectFavoriteState,
  fromFavorite.selectAllFavorites
);
