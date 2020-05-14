import {FavoriteModel} from '../model/favorite.model';
import * as FavoriteActions from './favorite.actions';
import {Action, createReducer, on} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<FavoriteModel> {}

export const adapter: EntityAdapter<FavoriteModel> = createEntityAdapter<FavoriteModel>();
export const initialState: State = localStorage.getItem('favorite') ? JSON.parse(localStorage.getItem('favorite')) : adapter.getInitialState({});

const favReducer = createReducer(
  initialState,
  on(FavoriteActions.add, (state, { favorite }) => {
    return adapter.addOne(favorite, state);
  }),
  on(FavoriteActions.remove, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(FavoriteActions.reset,  state => {
    return adapter.removeAll({ ...state });
  })
);

export function favoriteReducer(state: State | undefined, action: Action) {
  return favReducer(state, action);
}

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of Favorite ids
export const selectFavoriteIds = selectIds;

// select the dictionary of Favorite entities
export const selectFavoriteEntities = selectEntities;

// select the array of Favorites
export const selectAllFavorites = selectAll;

// select the total Favorite count
export const selectFavoriteTotal = selectTotal;
