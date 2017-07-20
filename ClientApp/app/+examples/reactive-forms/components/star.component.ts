import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'appc-ai-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.scss']
})

export class StarComponent implements OnChanges {
    @Input() public rating: number;
    public starWidth: number;
    @Output() public ratingClicked = new EventEmitter<string>();

    public ngOnChanges(changes: any): void {
        // Convert x out of 5 starts
        // to y out of 86px width
        this.starWidth = this.rating * 86 / 5;
    }

    public onClick(): void {
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
    }
}
