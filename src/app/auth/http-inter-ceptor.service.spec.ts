import { TestBed } from '@angular/core/testing';

import { HttpInterCeptorService } from './http-inter-ceptor.service';

describe('HttpInterCeptorService', () => {
  let service: HttpInterCeptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInterCeptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
