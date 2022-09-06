import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor() {}

  key = 'Andersen';

  saveData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }

  getData(key: string) {
    let data = localStorage.getItem(key) || '';
    return this.decrypt(data);
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

  clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(
      CryptoJS.enc.Utf8
    );
  }
}
