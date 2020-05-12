import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from '../main/main.component';
import {ArtistComponent} from '../artist/artist.component';
import {AlbumComponent} from '../album/album.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'artist/:id',
    component: ArtistComponent,
  },
  {
    path: 'album/:id',
    component: AlbumComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
