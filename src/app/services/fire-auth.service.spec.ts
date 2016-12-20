/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FireAuthService } from './fire-auth.service';

describe('FireAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireAuthService]
    });
  });

  it('should ...', inject([FireAuthService], (service: FireAuthService) => {
    expect(service).toBeTruthy();
  }));
});
