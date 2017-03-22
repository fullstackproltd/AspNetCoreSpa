import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'appc-directives',
  templateUrl: './directives-home.component.html'
})
export class DirectivesHomeComponent implements OnInit {
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
