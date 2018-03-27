import {Component, OnInit} from '@angular/core';
import {EncryptionService} from './encryption.service';

@Component({
  selector: 'app-password-encryption',
  templateUrl: './password-encryption.component.html',
  styleUrls: ['./password-encryption.component.css']
})
export class PasswordEncryptionComponent implements OnInit {

  algorithm: string;
  password: string;

  encPwd: string = 'Encrypted String';
  constructor(private eS: EncryptionService) { }

  ngOnInit() {
  }

  encryptedPassword(e: HTMLInputElement, p: HTMLInputElement) {
    if (e.value === '') {
      alert('Please select an encryption method');
    } else {
      this.algorithm = e.value ;
      this.password = p.value;
      console.log(this.algorithm + ' : ' + this.password);
      this.eS.encryptPassword(this.algorithm, this.password)
        .subscribe(
          (response: Response) => {
            this.encPwd = response.statusText;
            console.log(response);
            },
          (error) => {
            this.encPwd = 'Can not be encrypted';
            console.log('Errrrrrrrrr');
          }
        );
    }
  }

}
