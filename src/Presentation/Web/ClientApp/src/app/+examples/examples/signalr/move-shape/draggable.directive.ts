import { Directive, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { fromEvent } from 'rxjs';
import { map, takeUntil, flatMap } from 'rxjs/operators';

@Directive({
  selector: '[draggable]',
})
export class DraggableDirective implements OnInit, OnDestroy {
  private _hubConnection: HubConnection;
  private subscription: any;

  constructor(@Inject('BASE_URL') private baseUrl: string, public element: ElementRef) {}

  ngOnInit() {
    this._hubConnection = new HubConnectionBuilder().withUrl(`${this.baseUrl}shapeHub`).build();
    this._hubConnection.on('shapeMoved', function(x, y) {
      this.element.nativeElement.css({ left: x, top: y });
    });

    const target = this.element.nativeElement;
    const mouseup = fromEvent(target, 'mouseup');
    const mousemove = fromEvent(document, 'mousemove');
    const mousedown = fromEvent(target, 'mousedown');

    const mousedrag = mousedown.pipe(
      flatMap((md: any) => {
        const startX = md.clientX + window.scrollX,
          startY = md.clientY + window.scrollY,
          startLeft = parseInt(md.target.style.left, 10) || 0,
          startTop = parseInt(md.target.style.top, 10) || 0;

        return mousemove.pipe(
          map((mm: any) => {
            mm.preventDefault();

            return {
              left: startLeft + mm.clientX - startX,
              top: startTop + mm.clientY - startY,
            };
          }),
          takeUntil(mouseup),
        );
      }),
    );

    this.subscription = mousedrag.subscribe(pos => {
      target.style.top = pos.top + 'px';
      target.style.left = pos.left + 'px';
      this._hubConnection.invoke('MoveShape', pos.left, pos.top || 0);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
