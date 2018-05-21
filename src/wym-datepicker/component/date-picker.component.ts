import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatePickerService} from '../service/date-picker.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'wym-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  // 日期格式
  @Input() dateFormat = 'YYYY-MM-DD';

  // input框显示日期
  public inputDate: string = dayjs(new Date()).format(this.dateFormat);

  @Input()
  set _value(value) {
    if (dayjs(value).isValid()) {
      this.inputDate = dayjs(value).format(this.dateFormat);
    } else {
      this.handleError.emit('输入属性 _value 传入的不是一个有效的时间');
      throw Error('输入属性 _value 传入的不是一个有效的时间');
    }
  }

  // 今日日期
  public dayDate: string = dayjs().format(this.dateFormat);

  // 月份信息
  public MonthDate;

  // 是否显示date选择Wrap
  public isShowDateSelectWrap = false;

  @Output()
  changeDate: EventEmitter<string> = new EventEmitter<string>();

  // 错误事件
  @Output()
  handleError: EventEmitter<string> = new EventEmitter<string>();

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

  // 渲染数据
  render(direction: 'prve' | 'next'): void {
    let year, month;
    if (this.MonthDate) {
      year = this.MonthDate.year;
      month = this.MonthDate.month;
    }

    if (direction === 'prve') {
      month--;
    }

    if (direction === 'next') {
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
  switchWrapShowState(): void {
    this.isShowDateSelectWrap = !this.isShowDateSelectWrap;
  }

  // 切换日期月份
  switchDateMonth(event: Event, direction: 'prve' | 'next'): void {
    event.preventDefault();
    event.stopPropagation();
    this.render(direction);
  }

  // 选择日期
  selectDate(el: DayModel): void {
    const date = new Date(this.MonthDate.year, this.MonthDate.month - 1, el.date);
    const selectDate = dayjs(date).format(this.dateFormat);
    this.inputDate = selectDate;
    this.changeDate.emit(selectDate);
    this.isShowDateSelectWrap = false;
    this.MonthDate = this.datePickerService.getMonthDate(date);
  }

  // 清除日期
  clearDate() {
    this.inputDate = '';
    this.changeDate.emit(this.inputDate);
  }

  // 校验日期输入
  verifyDate(event): void {
    const value = event.target.value;
    if (dayjs(value).isValid()) {
      this.inputDate = dayjs(value).format(this.dateFormat);
      this.changeDate.emit(this.inputDate);
      this.MonthDate = this.datePickerService.getMonthDate(new Date(this.inputDate));
    } else {
      this.handleError.emit('input中输入的不是一个有效的时间');
      throw Error('input中输入的不是一个有效的时间');
    }
  }

  // 是否是当前日期
  isCurrentDate(el: DayModel): boolean {
    const date = new Date(this.MonthDate.year, this.MonthDate.month - 1, el.date);
    return this.inputDate === dayjs(date).format(this.dateFormat);
  }


}

export interface DayModel {
  month: number;
  date: number;
  showDate: number;
}
