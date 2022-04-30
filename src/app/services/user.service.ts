import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://sheet.best/api/sheets/236791e6-f454-411c-b49b-ca9323ee7493'

  constructor(private httpClient: HttpClient) { }

  //CRUD - Create, Read, Update, Delete

  //Read
  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.apiUrl);
  }

}
