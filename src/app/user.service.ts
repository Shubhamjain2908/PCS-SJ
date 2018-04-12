import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  userAuth(name, email, number) {
    const head = new HttpHeaders({'content-type' : 'application/json'});
    return this.http.post('/pepcuscapability-showcase/mail',
                          {name: name, email: email, number: number},
                          {headers: head});
  }
}
