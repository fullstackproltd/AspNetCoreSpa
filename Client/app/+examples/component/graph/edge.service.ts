import { Subject } from 'rxjs/Subject';
import { Coordinates } from './coordinates';
// import 'rxjs/add/operator/bufferCount';

export class EdgeService extends Subject<Coordinates> {

    public getCoordinates() {
        return this.asObservable().bufferCount(2).map(buffer => { return { first: buffer[0], second: buffer[1] }; });
    }

}
