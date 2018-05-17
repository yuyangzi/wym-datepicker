import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {chunk} from 'lodash';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  // input框显示日期
  public inputDate: string = (new Date()).toLocaleDateString().replace(/\//g, '-');

  // 当前日期
  public currentDate = new Date();

  // 月份信息
  public MonthDate;

  // 是否显示date选择Wrap
  public isShowDateSelectWrap = false;


  static format(date): string {
    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
    return year + '-' + month + '-' + day;
  }

  ngOnInit() {
    this.MonthDate = this.getMonthDate();
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!this.DetermineIfThereParent(target, 'datePickerBox')) {
        this.isShowDateSelectWrap = false;
      }
    });
  }

  constructor() {
  }


  getMonthDate(year = this.currentDate.getFullYear(), month = this.currentDate.getMonth() + 1) {
    // 获取到的日期数组
    const days: Array<DayModle> = [];

    // 获取当前月的第一天
    const fristDate = new Date(year, month - 1, 1);

    // 获取当前月份的第一天是星期几,星期日的话转化为7
    const fristDateWeekDay = fristDate.getDay() ? fristDate.getDay() : 7;

    // 使用Date对象的越界自动进位(退位)的特性获取到上一月的最后一天.
    const lastDayofLastMonth = new Date(year, month - 1, 0);

    // 保存上一月最后一天的天数
    const lastDateOfLastMonth = lastDayofLastMonth.getDate();

    // 计算当前月份的日期表中应显示多少上一月份的日期;
    const prveMonthDate = fristDateWeekDay - 1;

    // 获取到当月准确的年份和月份值;
    year = fristDate.getFullYear();
    month = fristDate.getMonth() + 1;

    // 获取当前月的最后一天的日期天数
    const lastDate = new Date(year, month, 0).getDate();

    // 循环6周的天数.因为每个月最多只有六周
    for (let i = 0; i < 7 * 6; i++) {
      // 当前月份的第一天
      const date = i + 1 - prveMonthDate;
      // 应当显示的天数
      let showDate = date;
      let currentMonth = month;

      // 上一月
      if (date <= 0) {
        showDate = lastDateOfLastMonth + date;
        currentMonth = month - 1;
      }
      // 下一月
      if (date > lastDate) {
        showDate = date - lastDate;
        currentMonth = month + 1;
      }

      currentMonth = currentMonth === 0 ? 12 : currentMonth;

      currentMonth = currentMonth === 13 ? 1 : currentMonth;

      days.push({
        month: currentMonth,
        date: date,
        showDate: showDate,
      });
    }

    return {
      year: year,
      month: month,
      days: chunk(days, 7),
    };
  }

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
    }

    this.MonthDate = this.getMonthDate(year, month);
  }

  // 切换是否显示日期选择框
  switchWrapShowState(event: Event) {
    this.isShowDateSelectWrap = !this.isShowDateSelectWrap;
  }

  // 切换日期月份
  switchDateMonth(event: Event, derection: 'prve' | 'next') {
    event.preventDefault();
    event.stopPropagation();
    this.render(derection);
  }

  // 选择日期
  selectDate(el) {
    const date = new Date(this.MonthDate.year, this.MonthDate.month - 1, el.date);
    this.inputDate = DatePickerComponent.format(date);
    this.isShowDateSelectWrap = false;
  }

  // 判断当前元素是否存在指定父元素
  DetermineIfThereParent(target, comparisonSelector: string): boolean {
    const parentElement = target.parentElement;
    if (parentElement) {
      const className = parentElement.className;
      if (className.includes(comparisonSelector)) {
        return true;
      } else {
        return parentElement.nodeName === 'BODY' ? false : this.DetermineIfThereParent(parentElement, comparisonSelector);
      }
    } else {
      return false;
    }
  }
}

interface DayModle {
  month: number;
  date: number;
  showDate: number;
}
