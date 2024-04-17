
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { submitSongRequest, submitSongRequestSuccess, submitSongRequestFailure } from './actions/song-request.actions.actions';
import { SongRequest } from './models/song-request.model';
import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { SongRequestService } from './services/song-request.service';

@Injectable()
export class SongRequestEffects {
  constructor(
    private actions$: Actions,
    private songRequestService: SongRequestService
  ) {}

  submitSongRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitSongRequest),
      tap(action => {
        console.log('Action received:', action);
      }),
      mergeMap(({ request }) => {
        console.log('Submitting song request:', request);
        return this.songRequestService.submitRequest(request).pipe(
          map((newRequest: SongRequest) => {
            console.log('Request submission successful:', newRequest);
            return submitSongRequestSuccess({ request: newRequest });
          }),
          catchError((error) => {
            console.log('Request submission failed:', error);
            return of(submitSongRequestFailure({ error }));
          })
        );
      })
    )
  );
}
