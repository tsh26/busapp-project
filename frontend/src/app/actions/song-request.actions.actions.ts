import { props } from '@ngrx/store';

import { createAction } from '@ngrx/store';
import { SongRequest } from '../models/song-request.model';

export const submitSongRequest = createAction(
  '[Song Request] Submit',
  props<{ request: SongRequest }>()
);

export const submitSongRequestSuccess = createAction(
  '[Song Request] Submit Success',
  props<{ request: SongRequest }>()
);

export const submitSongRequestFailure = createAction(
  '[Song Request] Submit Failure',
  props<{ error: any }>()
);

