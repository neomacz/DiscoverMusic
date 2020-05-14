import {Component, Input, OnInit} from '@angular/core';
import {createFeatureSelector, createSelector, Store} from '@ngrx/store';
import * as FavoriteActions from './favorite.actions';
import {FavoriteModel} from '../model/favorite.model';
import * as fromFavorite from './favorite.reducer';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  @Input() name: string;
  @Input() thumb: string;
  @Input() wrapperType: string;
  @Input() id: string;
  favorite = false;
  favoriteCount;
  constructor(private store: Store<any>, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.store.select(selectFavoriteIds).subscribe((o: string[]) => {
      this.favorite = o.includes(this.id);
      this.favoriteCount = o.length;
    });
  }

  toggleFavorite() {
    if (this.favorite) {
      this.removeFromFavorite();
    } else {
      this.addToFavorite();
    }
  }
  addToFavorite() {
    if (this.favoriteCount < 5) {
      const favorite: FavoriteModel = {name: this.name, thumb: this.thumb, wrapperType: this.wrapperType, id: this.id};
      this.store.dispatch(FavoriteActions.add({ favorite }));
      this.snackBar.open(this.name + ' has been added to Favorite', '', { duration: 2000,
      });
      this.updateLocalStorage();
    } else {
      this.snackBar.open('Favorite only can save 5 items', '', { duration: 2000,
      });
    }
  }
  removeFromFavorite() {
    const id = this.id;
    this.store.dispatch(FavoriteActions.remove({ id }));
    this.snackBar.open(this.name + ' has been removed from Favorite', '', { duration: 2000,
    });
    this.updateLocalStorage();
  }
  updateLocalStorage() {
    const subscription = this.store.select(selectFavoriteState).subscribe(o => {
      localStorage.setItem('favorite', JSON.stringify(o));
    });
    subscription.unsubscribe();
  }

}

export const selectFavoriteState = createFeatureSelector<fromFavorite.State>('favorite');

export const selectFavoriteIds = createSelector(
  selectFavoriteState,
  fromFavorite.selectFavoriteIds
);

export const selectAllFavorites = createSelector(
  selectFavoriteState,
  fromFavorite.selectAllFavorites
);
