import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Data} from '@angular/router';

@Injectable()
export class DecryptionService {
  constructor(private http: HttpClient) {}

  decryptPassword(algorithm: string, password: string, key: string) {
    const head = new HttpHeaders({'content-type' : 'application/json'});
    return this.http.post('/pepcuscapability-showcase/decrypt',
                          {algorithm: algorithm , password: password, key: key},
                          {headers: head});
  }

  decryptFile(data: Data) {
    return this.http.post('/pepcuscapability-showcase/decrypt/file', data);
  }
}
