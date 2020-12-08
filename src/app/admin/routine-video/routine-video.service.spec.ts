import { TestBed } from '@angular/core/testing';

import { RoutineVideoService } from './routine-video.service';

describe('RoutineVideoService', () => {
  let service: RoutineVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
