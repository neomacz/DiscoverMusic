import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }
  id;
  selected;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
  }
  toggleSelected() {
    this.selected = !this.selected;
  }

}
