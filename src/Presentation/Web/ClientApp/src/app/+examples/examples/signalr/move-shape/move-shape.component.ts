import { Component, Inject, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { fromEvent } from 'rxjs';
import { map, takeUntil, flatMap } from 'rxjs/operators';

@Component({
  selector: 'appc-move-shape',
  templateUrl: './move-shape.component.html',
  styleUrls: ['./move-shape.component.scss'],
})
export class MoveShapeComponent implements AfterViewInit {
  @ViewChild('draggable', { static: true }) element: ElementRef;
  private hub: HubConnection;
  constructor(@Inject('BASE_URL') private baseUrl: string) {}

  ngAfterViewInit() {
    const target = this.element.nativeElement;
    this.hub = new HubConnectionBuilder().withUrl(`${this.baseUrl}shapeHub`).build();
    this.hub.on('shapeMoved', (x, y) => {
      target.style.left = x;
      target.style.top = y;
    });

    const mouseup = fromEvent(target, 'mouseup');
    const mousemove = fromEvent(document, 'mousemove');
    const mousedown = fromEvent(target, 'mousedown');

    const mousedrag = mousedown.pipe(
      flatMap((md: any) => {
        const startX = md.clientX + window.scrollX;
        const startY = md.clientY + window.scrollY;
        const startLeft = parseInt(md.target.style.left, 10) || 0;
        const startTop = parseInt(md.target.style.top, 10) || 0;

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

    this.hub
      .start()
      .then(() => {
        mousedrag.subscribe(pos => {
          target.style.top = pos.top + 'px';
          target.style.left = pos.left + 'px';
          this.hub.invoke('MoveShape', pos.left, pos.top || 0);
        });
      })
      .catch(err => console.log('Error while establishing connection: ' + err));
  }
}
