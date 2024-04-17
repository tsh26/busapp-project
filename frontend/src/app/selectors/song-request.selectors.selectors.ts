import { createSelector } from '@ngrx/store';
import { State } from '../reducers/song-request.reducer.reducer';

export const selectSongRequestState = (state: any): State => state.songRequest;

export const selectSongRequests = createSelector(
  selectSongRequestState,
  (state: State) => state.requests
);

export const selectSongRequestError = createSelector(
  (state: State) => state.error,
  (error) => error
);
