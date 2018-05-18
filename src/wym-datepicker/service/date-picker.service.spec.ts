import { TestBed, inject } from '@angular/core/testing';

import { DatePickerService } from './date-picker.service';

describe('DatePickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePickerService]
    });
  });

  it('should be created', inject([DatePickerService], (service: DatePickerService) => {
    expect(service).toBeTruthy();
  }));
});
