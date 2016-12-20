/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VariableService } from './variable.service';

describe('VariableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VariableService]
    });
  });

  it('should ...', inject([VariableService], (service: VariableService) => {
    expect(service).toBeTruthy();
  }));
});
