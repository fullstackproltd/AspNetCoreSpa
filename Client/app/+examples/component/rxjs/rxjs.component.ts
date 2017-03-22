import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'appc-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnInit {

  public click$ = new Subject();
  public clock: Observable<any>;
  public ngOnInit() {
    this.clock = Observable.merge(
      this.click$.mapTo('hour'),
      Observable.interval(1000).mapTo('second')
    )
      // tslint:disable-next-line:whitespace
      .startWith(<any>new Date())
      .scan((acc, curr) => {
        const date = new Date(acc.getTime());

        if (curr === 'second') {
          date.setSeconds(date.getSeconds() + 1);
        }

        if (curr === 'hour') {
          date.setHours(date.getHours() + 1);
        }

        return date;
      });
  }

}
