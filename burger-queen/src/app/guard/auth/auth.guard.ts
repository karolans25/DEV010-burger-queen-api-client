import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = new Router();
  const role = localStorage.getItem('role');
  if(route.url.toString() === '' && (role !== null && role !== '')){
    return true;
  }
  router.navigate(['login']);
  return false;
};
