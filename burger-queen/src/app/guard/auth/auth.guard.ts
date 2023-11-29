import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = new Router();
  const role = localStorage.getItem('role');
  console.log(state.url);
  if(route.url.toString() === ''){
    if(role !== null) {
      return true;
    }
  }
  router.navigate(['login']);
  return false;
};
