import { TestBed } from '@angular/core/testing';

import { EmojiScriptServiceService } from './emoji-script-service.service';

describe('EmojiScriptServiceService', () => {
  let service: EmojiScriptServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmojiScriptServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
