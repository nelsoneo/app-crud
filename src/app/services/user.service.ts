import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://sheet.best/api/sheets/236791e6-f454-411c-b49b-ca9323ee7493'
   httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  //CRUD - Create, Read, Update, Delete

  //User unique
  getUser(id: string):Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.apiUrl}/id/${id}`)
  }

  //Read
  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  //Create
  postUser(user: User): Observable<User>{
    return this.httpClient.post<User>(this.apiUrl, user, this.httpOptions)
  }

  //delete
  deleteUser(id: number): Observable<User>{
    return this.httpClient.delete<User>(`${this.apiUrl}/id/${id}`)
  }

  //Update
  putUser(id: string, user: User): Observable<User>{
    return this.httpClient.put<User>(`${this.apiUrl}/id/${id}`, user, this.httpOptions)
  }
}
