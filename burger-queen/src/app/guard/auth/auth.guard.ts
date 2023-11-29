import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService} from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  // let service!: AuthService;
  // let router!: Router;
  // let toastr!: ToastrService;

  console.log(route);
  console.log(state);

  return true;
  // if(service.isLoggedIn()){
    // return true;
  // } else {
    // router.navigate(['login']);
    // return false;
  // }
};
