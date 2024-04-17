import { createReducer, on } from '@ngrx/store';
import { submitSongRequest, submitSongRequestSuccess, submitSongRequestFailure } from '../actions/song-request.actions.actions';
import { SongRequest } from '../models/song-request.model';

export interface State {
  requests: SongRequest[];
  error: any;
}

const initialState: State = {
  requests: [],
  error: null,
};

export const songRequestReducer = createReducer(
  initialState,
  on(submitSongRequestSuccess, (state, { request }) => {
    console.log('State before updating:', state);
    console.log('New request:', request);
    const newState = {
      requests: [...state.requests, request],
    };
    console.log('State after updating:', newState.requests);
    return newState;

  }),
  on(submitSongRequestFailure, (state, { error }) => {
    console.log('submitSongRequestFailure:', error);
    console.log('Current state.requests:', state.requests)
    return {
      ...state,
      error,
    };
  })
);

