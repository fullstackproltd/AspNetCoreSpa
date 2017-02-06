import { RequestMethod } from '@angular/http';
// Import the rxjs operators we need (in a production app you'll
//  probably want to import only the operators you actually use)
//
export class DataServiceOptions {
    public method: RequestMethod;
    public url: string;
    public headers: any = {};
    public params = {};
    public data = {};
}
