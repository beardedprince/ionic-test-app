import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TabsGuard implements CanActivate {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.fireAuth.authState.pipe(map(res => {
      if (!res) {
        console.log(res);
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }));
  }

}
