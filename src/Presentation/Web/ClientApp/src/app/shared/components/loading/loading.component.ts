import { Component, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../services';

@Component({
  selector: 'appc-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements AfterViewInit, OnDestroy {
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoadingService, private _elmRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this._elmRef.nativeElement.style.display = 'none';
    this.loadingSubscription = this.loadingScreenService.loading$.pipe().subscribe((status: boolean) => {
      this._elmRef.nativeElement.style.display = status ? 'block' : 'none';
      this._changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
