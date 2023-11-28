import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { console.log('LocalStorage'); }

  setStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  clearStorage() {
    localStorage.clear();
  }

}
