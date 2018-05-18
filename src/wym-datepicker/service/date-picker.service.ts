import { Injectable } from '@angular/core';
import {DayModel} from '../component/date-picker.component';
import {chunk} from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  // 当前日期
  private currentDate = new Date();

  constructor() { }

  getMonthDate(_Date: Date = this.currentDate) {
    let year = _Date.getFullYear(), month = _Date.getMonth() + 1;
    // 获取到的日期数组
    const days: Array<DayModel> = [];

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
