import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'appc-register-confirmation',
    templateUrl: './register-confirmation.component.html'
})
export class RegisterConfirmationComponent implements OnInit, OnDestroy {
    emailConfirmed: boolean;
    private sub: any;

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.router
            .routerState.root
            .queryParams
            .subscribe((params: any) => {
                this.emailConfirmed = (params.emailConfirmed && params.emailConfirmed.toLowerCase() === 'true');
            });

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
