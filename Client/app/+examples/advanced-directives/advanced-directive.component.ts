import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'appd-advnaced-directives',
  templateUrl: './advanced-directive.component.html',
  styleUrls: ['./advanced-directive.component.scss'],
})
export class AdvancedDirectivesComponent implements OnInit {
  public messages = {
    one: 'One is better',
    two: 'Two is best',
    three: 'Three is amazing',
  };

  public ngOnInit() {
    setInterval(() => {
      this.messages = {
        one: Math.random().toString().slice(0, 3),
        two: Math.random().toString().slice(0, 3),
        three: Math.random().toString().slice(0, 3),
      };
    }, 1000);

  }
}
