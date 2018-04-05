import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  userAuth(name, email, number) {
    const head = new HttpHeaders({'content-type' : 'application/json'});
    return this.http.post('http://localhost:8383/pepcuscapability-showcase/mail',
                          {name: name, email: email, number: number},
                          {headers: head});
  }

  userVerify(otp, email) {
    const head = new HttpHeaders({'content-type' : 'application/json'});
    return this.http.post('http://localhost:8383/pepcuscapability-showcase/mail/verify',
                          {otp: otp, email: email},
                          {headers: head});
  }
}
