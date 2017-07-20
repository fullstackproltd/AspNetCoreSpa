// import { Injectable } from '@angular/core';

// import { DataService } from './data.service';
// import { UtilityService } from './utility.service';
// import { User } from '../models/user.model';

// @Injectable()
// export class AuthService {

//     constructor(public us: UtilityService) { }

//     public logout() {
//         sessionStorage.clear();
//         this.us.navigateToSignIn();
//     }

//     public isLoggedIn(): boolean {
//         return this.user(undefined) !== undefined;
//     }

//     public user(user: User): User {
//         if (user) {
//             sessionStorage.setItem('user', JSON.stringify(user));
//         }
//         let userData = JSON.parse(sessionStorage.getItem('user'));
//         if (userData) {
//             user = new User(userData.displayName, userData.roles);
//         }
//         return user ? user : undefined;
//     }

//     public setAuth(res: any): void {
//         if (res && res.user) {
//             sessionStorage.setItem('user', JSON.stringify(res.user));
//         }
//     }
// }
