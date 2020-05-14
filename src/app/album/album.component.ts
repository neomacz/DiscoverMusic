import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItunesService} from '../itunes.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  id;
  albumName;
  artistName;
  artistId;
  thumbnail;
  displayedColumns: string[] = ['position', 'name', 'duration', 'price', 'favorite'];
  dataSource = [];
  constructor(private activatedRoute: ActivatedRoute, private service: ItunesService) { }
  ngOnInit() {
    this.dataSource = [];
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.service.lookup(this.id, 'song').subscribe((o: any) => {
      const collection = o.results.filter(result => result.wrapperType === 'collection')[0];
      this.albumName = collection.collectionName;
      this.artistName = collection.artistName;
      this.thumbnail = collection.artworkUrl100;
      this.artistId = collection.artistId;

      this.dataSource = o.results.filter(result => result.wrapperType === 'track');
    });
  }

  millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.round((millis % 60000) / 1000);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

}
