import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatePickerService} from '../service/date-picker.service';

@Component({
  selector: 'wym-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  // input框显示日期
  public inputDate: string = (new Date()).toLocaleDateString().replace(/\//g, '-');

  @Input()
  set _value(value) {
    const date = new Date(value);
    this.inputDate = DatePickerComponent.format(date);
  }

  // 月份信息
  public MonthDate;

  // 是否显示date选择Wrap
  public isShowDateSelectWrap = false;

  @Output()
  changeDate: EventEmitter<string> = new EventEmitter<string>();


  static format(date): string {
    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
    return year + '-' + month + '-' + day;
  }

  ngOnInit() {
    this.MonthDate = this.datePickerService.getMonthDate(new Date(this.inputDate));
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!this.datePickerService.DetermineIfThereParent(target, 'datePickerBox')) {
        this.isShowDateSelectWrap = false;
      }
    });
  }

  constructor(private datePickerService: DatePickerService) {
  }

  /**
   * 渲染数据
   * @param {"prve" | "next"} derection
   */
  render(derection: 'prve' | 'next') {
    let year, month;
    if (this.MonthDate) {
      year = this.MonthDate.year;
      month = this.MonthDate.month;
    }

    if (derection === 'prve') {
      month--;
    }

    if (derection === 'next') {
      month++;
    }

    // 纠正日期
    if (month === 0) {
      month = 12;
      year--;
    } else if (month === 13) {
      month = 1;
      year++;
    }

    const date = new Date(`${year}-${month}`);
    this.MonthDate = this.datePickerService.getMonthDate(date);
  }

  // 切换是否显示日期选择框
  switchWrapShowState() {
    this.isShowDateSelectWrap = !this.isShowDateSelectWrap;
  }

  // 切换日期月份
  switchDateMonth(event: Event, derection: 'prve' | 'next') {
    event.preventDefault();
    event.stopPropagation();
    this.render(derection);
  }

  // 选择日期
  selectDate(el: DayModel) {
    const date = new Date(this.MonthDate.year, this.MonthDate.month - 1, el.date);
    const selectDate = DatePickerComponent.format(date);
    this.inputDate = selectDate;
    this.changeDate.emit(selectDate);
    this.isShowDateSelectWrap = false;
    this.MonthDate = this.datePickerService.getMonthDate(date);
  }

}

export interface DayModel {
  month: number;
  date: number;
  showDate: number;
}
