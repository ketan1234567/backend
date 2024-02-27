import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { OurServicesService } from './our-services.service';
import { map } from 'rxjs';

export class AuthGuard implements CanActivate {
  constructor(private router: Router,private _services:OurServicesService) {}

  canActivate() {
    return this._services.isLoggedIn$.pipe(
      
      map((isLoggedIn:boolean)=>{
        if(!isLoggedIn){
          this.router.navigate(['login']);
          return false;
        }else{
          return true;
        }
        
      })
    )
}
}