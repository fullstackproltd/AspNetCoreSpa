import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'appc-about-me',
    styleUrls: ['./about-me.component.scss'],
    templateUrl: './about-me.component.html'    
})
export class AboutMeComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        console.log('aboutme component loaded');
    }
}
