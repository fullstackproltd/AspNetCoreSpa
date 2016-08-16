import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

@Component({
    selector: 'appc-about-me',
    styleUrls: ['./about-me.component.scss'],
    templateUrl: './about-me.component.html',
    animations: [
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
export class AboutMeComponent implements OnInit {
    public buttonState: string = 'inactive';
    constructor() { }

    ngOnInit() {
        console.log('aboutme component loaded');
    }

    toggleAnimation() {
        this.buttonState = this.buttonState === 'active' ? 'inactive' : 'active';
    }
}
