import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItunesService} from '../itunes.service';
import {AlbumModel} from '../main/album.model';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  id;
  artistName;
  favorited = false;
  albums: AlbumModel[] = [];
  constructor(private activatedRoute: ActivatedRoute, private service: ItunesService) { }
  ngOnInit() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.service.lookup(this.id, 'album').subscribe((o: any) => {
      console.log(o.results);
      this.artistName = o.results.filter(result => result.artistType === 'Artist')[0].artistName;
      console.log(o.results.filter(result => result.artistType === 'Artist').artistName);

      o.results.filter(result => result.wrapperType === 'collection').forEach(r => {
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
  toggleFavorited() {
    this.favorited = !this.favorited;
  }

}
