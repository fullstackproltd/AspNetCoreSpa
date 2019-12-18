import { Directive, EventEmitter, ElementRef, Renderer, HostListener, Input, Output } from '@angular/core';

function setProperty(renderer: Renderer, elementRef: ElementRef, propName: string, propValue: any): void {
    renderer.setElementProperty(elementRef, propName, propValue);
}

@Directive({ selector: '[appTableFiltering]' })
export class AppTableFilteringDirective {
    @Input() public appTableFiltering: any = {
        filterString: '',
        columnName: 'name'
    };

    @Output() public tableChanged: EventEmitter<any> = new EventEmitter();

    @Input()
    public get config(): any {
        return this.appTableFiltering;
    }

    public set config(value: any) {
        this.appTableFiltering = value;
    }

    private element: ElementRef;
    private renderer: Renderer;

    @HostListener('input', ['$event.target.value'])
    public onChangeFilter(event: any): void {
        this.appTableFiltering.filterString = event;
        this.tableChanged.emit({ filtering: this.appTableFiltering });
    }

    public constructor(element: ElementRef, renderer: Renderer) {
        this.element = element;
        this.renderer = renderer;
        // Set default value for filter
        setProperty(this.renderer, this.element, 'value', this.appTableFiltering.filterString);
    }
}
