import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from './api.urls';

@Injectable({
  providedIn: 'root'
})
export class UserApi {

  private http = inject(HttpClient);

  getUsers() {
    return this.http.get<any>(API_URLS.USERS);
  }
}