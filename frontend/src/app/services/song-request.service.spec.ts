import { TestBed } from '@angular/core/testing';

import { SongRequestService } from './song-request.service';

describe('SongRequestService', () => {
  let service: SongRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
