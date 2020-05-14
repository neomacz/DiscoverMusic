import {createAction, props} from '@ngrx/store';
import {FavoriteModel} from '../model/favorite.model';

export const add = createAction('[Favorite Component] Add', props<{ favorite: FavoriteModel }>());
export const remove = createAction('[Favorite Component] Remove', props<{id: string }>());
export const reset = createAction('[Favorite Component] Reset');
