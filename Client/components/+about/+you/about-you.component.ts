import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sg-about-you',
    styleUrls: ['./about-you.component.scss'],
    templateUrl: './about-you.component.html'
})
export class AboutYouComponent implements OnInit {
    constructor() { }

    ngOnInit() { 
        console.log("testing the spec");
       }
}
