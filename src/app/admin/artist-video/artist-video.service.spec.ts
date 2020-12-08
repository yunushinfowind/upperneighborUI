import { TestBed } from '@angular/core/testing';

import { ArtistVideoService } from './artist-video.service';

describe('ArtistVideoService', () => {
  let service: ArtistVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
