import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Data} from '@angular/router';

@Injectable()
export class LogService {

  constructor(private http: HttpClient) { }

  generateLog(data: Data) {
    return this.http.post('/pepcuscapability-showcase/log', data);
  }

  sampleFile() {
    return this.http.post('/pepcuscapability-showcase/log?useSample=true', {});
  }
}
