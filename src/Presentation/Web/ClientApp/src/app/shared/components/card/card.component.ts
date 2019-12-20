import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit, AfterViewInit {
  @ViewChild('footerTemplate', { static: true }) footerTemplate;
  @Input() title: string;
  @Input() body: string | TemplateRef<any>;
  @Input() headerClass: string;
  @Output() onClick = new EventEmitter<any>();

  showFooter: boolean;
  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.showFooter =
      this.footerTemplate.nativeElement &&
      this.footerTemplate.nativeElement.children.length > 0;
    this.cdRef.detectChanges();
  }
}
