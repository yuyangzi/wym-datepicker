import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from '../component/date-picker.component';

@NgModule({
  declarations: [DatePickerComponent],
  imports: [CommonModule],
  exports: [DatePickerComponent, CommonModule]
})


export class DatePickerModule { }
