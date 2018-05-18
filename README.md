# wym-ngdatepicker

&emsp;&emsp;基于`Angular6`的日期选择组件

```shell
npm install wym-ngdatepicker
```

## 使用方式

```javascript
app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {DatePickerModule} from 'wym-ngdatepicker/dist';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DatePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```html
<wym-date-picker></wym-date-picker>
```
