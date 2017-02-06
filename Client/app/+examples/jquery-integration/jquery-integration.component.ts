import { Component, OnInit, Inject, ElementRef } from '@angular/core';

// import 'jquery';

// require('../../../../node_modules/jquery-ui/ui/widgets/draggable');

declare var jQuery: any;

@Component({
  selector: 'appc-jquery-itegration',
  templateUrl: './jquery-integration.component.html',
  styleUrls: ['./jquery-itegration.component.scss'],
})
export class JqueryIntegrationComponent implements OnInit {

  public elementRef: ElementRef;
  public loadAPI: Promise<any>;

  constructor( @Inject(ElementRef) elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  public ngOnInit() {
    jQuery(this.elementRef.nativeElement).find('.moving-box').draggable({ containment: '#draggable-parent' });
  }

  // We are only loading these script to verify jQuery integration
  // For production use them as npm packages and let webpack load them
  public loadScript() {
    let head = document.getElementsByTagName('head')[0];
    // Load jquery
    let jQNode = document.createElement('script');
    jQNode.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js';
    jQNode.type = 'text/javascript';
    jQNode.charset = 'utf-8';
    head.insertBefore(jQNode, head.firstChild);
    // Load jquery Ui
    let jQuiNode = document.createElement('script');
    jQuiNode.src = 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js';
    jQuiNode.type = 'text/javascript';
    jQuiNode.charset = 'utf-8';
    head.insertBefore(jQuiNode, head.firstChild);
  }

}
