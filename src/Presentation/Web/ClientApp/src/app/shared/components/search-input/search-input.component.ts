import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, map } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'appc-search-input',
  styleUrls: ['./search-input.component.scss'],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() key: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() model = '';
  @Input() initialData: any[];
  @Input() staticAction: Function;
  @Input() dynamicAction: Function;
  @Output() selectItem = new EventEmitter<any>();
  subscription: Subscription;
  debounceTime = 300;
  // https://github.com/ng-bootstrap/ng-bootstrap/issues/1119
  listSize = 10;
  formatter = (result: string) => result[this.key] || this.model;

  constructor() {}

  ngOnInit(): void {
    if (this.model) {
      this.subscription = this.search(of(this.model)).subscribe();
    }
  }

  search = (text$: Observable<string>) => {
    const textObservable = text$.pipe(debounceTime(this.debounceTime), distinctUntilChanged());

    if (this.staticAction) {
      return textObservable.pipe(
        map(term => {
          return this.staticAction(term).slice(0, this.listSize);
        }),
      );
    } else if (this.dynamicAction) {
      return textObservable.pipe(
        switchMap(term => {
          return this.dynamicAction(term).pipe(
            map(x => (<any>x).slice(0, this.listSize)),
            catchError(() => {
              return of([]);
            }),
          );
        }),
      );
    }

    throw Error('Provide either "staticAction" OR "dynamicAction" to perform search');
  };

  onSelectItem(ngbItem: NgbTypeaheadSelectItemEvent) {
    this.selectItem.next(ngbItem.item);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
