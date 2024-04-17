import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SongRequest.EffectsEffects } from './song-request.effects.effects';

describe('SongRequest.EffectsEffects', () => {
  let actions$: Observable<any>;
  let effects: SongRequest.EffectsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SongRequest.EffectsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SongRequest.EffectsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
