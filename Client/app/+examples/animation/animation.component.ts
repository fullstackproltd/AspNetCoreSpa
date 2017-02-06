import { Component, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'appc-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
  animations: [
    trigger('signal', [
      state('void', style({
        transform: 'translateY(-100%)'
      })),
      state('go', style({
        backgroundColor: 'green',
        height: '100px'
      })),
      state('stop', style({
        backgroundColor: 'red',
        height: '50px'
      })),
      transition('* => *', animate('1s ease-out'))
    ]),
    trigger('buttonState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active', style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.5)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class AnimationComponent {

  public buttonState: string = 'inactive';

  public signal = 'stop';
  public isHere = false;

  public onGoClick() {
    this.signal = 'go';
  }

  public onStopClick() {
    this.signal = 'stop';
  }

  public toggleAnimation() {
    this.buttonState = this.buttonState === 'active' ? 'inactive' : 'active';
  }

  public onToggle() {
    this.isHere = !this.isHere;
  }

}
