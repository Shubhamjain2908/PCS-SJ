import {Component, ViewChild} from '@angular/core';
import {EncryptionService} from './encryption.service';
import {NgForm} from '@angular/forms';
import {isUndefined} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('fFile') submitForm: NgForm;
  @ViewChild('AccUserImg') AccUserImage;

  key: string;
  isMethodAES = false;
  isFileSelected = false;
  filename: string;

  encPwd = 'Encrypted String';
  fileReady = false;
  constructor(private eS: EncryptionService) { }

  encryptedPassword(algorithm: HTMLInputElement, password: HTMLInputElement) {
    if (algorithm.value === '') {
      alert('Please select an encryption method');
    }
    if (this.isMethodAES && isUndefined(this.key)) {
      alert('Please enter a key for encrypting string');
    } else {
      console.log(algorithm.value + ' : ' + password.value + ' : ' + this.key);
      this.eS.encryptPassword(algorithm.value, password.value, this.key)
        .subscribe(
          (response: any) => {
            this.encPwd = response.password;
            console.log(response);
          },
          (error) => {
            this.encPwd = 'Can not be encrypted';
            console.log('Errrrrrrrrr' + error);
          }
        );
    }
  }

  onMethodChange(algorithm: HTMLInputElement) {
    if (algorithm.value === 'aes') {
      this.isMethodAES = true;
    } else {
      this.isMethodAES = false;
    }
  }

  onFileChange() {
    this.isFileSelected = true;
  }

  onSubmit() {
    const formData = new FormData();
    if (this.isFileSelected && this.submitForm.value.key !== '') {
      this.filename = this.AccUserImage.nativeElement.files[0].name;
      console.log(this.AccUserImage.nativeElement.files[0].name);
      formData.append('file', this.AccUserImage.nativeElement.files[0]);
      formData.append('key', this.submitForm.value.key);
      this.eS.encryptFile(formData)
        .subscribe(
          (response: any) => {
            this.fileReady = true;
            console.log(response);
          },
          (error) => console.log(error)
        );
    } else {
      alert('Please select a file to be encrypted !!!');
    }
  }

  onDownload() {
    window.location.href = 'http://localhost:8383/pepcuscapability-showcase/encrypt/file?filename=' + this.filename;
    this.isFileSelected = false;
    this.fileReady = false;
    this.submitForm.reset();
  }
}
