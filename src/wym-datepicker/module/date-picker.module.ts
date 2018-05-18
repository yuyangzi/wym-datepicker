import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatePickerComponent} from '../component/date-picker.component';
import {DatePickerService} from '../service/date-picker.service';

@NgModule({
  declarations: [DatePickerComponent],
  imports: [CommonModule],
  exports: [DatePickerComponent, CommonModule],
  providers: [DatePickerService]
})


export class DatePickerModule {
}
