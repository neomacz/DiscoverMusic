import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItunesService} from '../itunes.service';
import {AlbumModel} from '../model/album.model';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  id;
  artistName;
  artistThumbnail;
  albums: AlbumModel[] = [];
  constructor(private activatedRoute: ActivatedRoute, private service: ItunesService) { }
  ngOnInit() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.service.lookup(this.id, 'album').subscribe((o: any) => {
      const artist = o.results.filter(result => result.wrapperType === 'artist')[0];
      this.artistName = artist.artistName;

      o.results.filter(result => result.wrapperType === 'collection').forEach(r => {
        const album = {} as AlbumModel;

        if (r.collectionId && this.albums.filter(a => a.collectionId === r.collectionId).length === 0) {
          album.collectionId = r.collectionId;
          album.collectionName = r.collectionName;
          album.thumbnail = r.artworkUrl100;
          this.artistThumbnail = r.artworkUrl100;
          this.albums.push(album);
        }
      });
    });
  }

}
