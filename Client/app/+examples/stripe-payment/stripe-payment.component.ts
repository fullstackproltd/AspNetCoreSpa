import { Component, OnInit, NgZone } from '@angular/core';
import { UtilityService } from '../../core/services/utility.service';

declare const Stripe: any;

@Component({
  selector: 'appc-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss']
})
export class StripePaymentComponent implements OnInit {
  // Fields
  public cardNumber = '4242424242424242';
  public expiryMonth = '10';
  public expiryYear = '18';
  public cvc = '222';

  public message: string;

  constructor(private zone: NgZone, private us: UtilityService) { }

  public ngOnInit() {
    this.us.loadScript('https://checkout.stripe.com/checkout.js').subscribe(x => {
      this.us.loadScript('https://js.stripe.com/v2/').subscribe(y => {
        // here we setup the stripe publish key.
        // notice that this is a test key for my account so replace with production key(live)
        Stripe.setPublishableKey('pk_test_1JJKhZ3DycRrYqdE5GWzlbDd');
      });
    });
  }

  public openCheckout() {
    // tslint:disable-next-line:whitespace
    const handler = (<any>window).StripeCheckout.configure({
      locale: 'auto',
      key: 'pk_test_1JJKhZ3DycRrYqdE5GWzlbDd',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: 2000
    });

  }

  public getToken() {
    // set up the card data as an object
    this.message = 'Loading...';

    const dataObj = {
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc
    };

    // Request a token from Stripe:
    Stripe.card.createToken(dataObj, (status: number, response: any) => {
      // Wrapping inside the Angular zone
      this.zone.run(() => {
        if (status === 200) {
          this.message = `Success! Card token ${response.card.id}.`;
        } else {
          this.message = response.error.message;
        }
      });
    }

    );
  }

}
