import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class EncryptionService {
  constructor(private http: HttpClient) { }

  encryptPassword(algorithm: string, password: string) {
    const head = new HttpHeaders({'content-type' : 'application/json'});
    return this.http.post('http://localhost:8383/pepcuscapability-showcase/encrypt',
                          {algorithm: algorithm , password: password},
                          {headers: head});
  }
}
