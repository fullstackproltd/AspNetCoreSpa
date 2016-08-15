import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sg-register-confirmation',
    templateUrl: './register-confirmation.component.html'
})
export class RegisterConfirmationComponent implements OnInit {
    emailConfirmed: boolean;
    private sub: any;

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.router
            .routerState
            .queryParams
            .subscribe(params => {
                this.emailConfirmed = (params['emailConfirmed'] && params['emailConfirmed'].toLowerCase() === 'true');
            });

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
