import {Component, OnInit, ViewChild} from '@angular/core';
import {DecryptionService} from './decryption.service';
import {NgForm} from '@angular/forms';
import {isUndefined} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('f') submitForm: NgForm;
  @ViewChild('AccUserImg') AccUserImage;

  algorithm: string;
  password: string;

  decPwd = 'Decrypted String';

  key: string;
  isMethodAES = false;
  isFileSelected = false;
  fileReady = false;
  filename: string;

  constructor(private dS: DecryptionService) { }

  ngOnInit() {
  }

  decryptedPassword(e: HTMLInputElement, p: HTMLInputElement) {
    if (e.value === '') {
      alert('Please select an decryption method');
    }
    if (this.isMethodAES && isUndefined(this.key)) {
      alert('Please enter a key for decrypting a string');
    } else {
      this.algorithm = e.value ;
      this.password = p.value;
      console.log(this.algorithm + ' : ' + this.password);
      this.dS.decryptPassword(this.algorithm, this.password, this.key)
        .subscribe(
          (response: any) => {
            if (response.password === '' || isUndefined(response.password) || response.password === null) {
              this.decPwd = 'Can not be decrypted';
            } else {
              this.decPwd = response.password;
              console.log(response);
            }
          },
          (error) => {
            this.decPwd = 'Can not be decrypted';
            console.log('Errrrrrrrrr');
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
    if (this.AccUserImage.nativeElement.files.length !== 0) {
      this.isFileSelected = true;
    } else {
      this.isFileSelected = false;
    }
  }

  onSubmit() {
    const formData = new FormData();
    if (this.isFileSelected && this.submitForm.value.key !== '') {
      this.filename = this.AccUserImage.nativeElement.files[0].name;
      console.log(this.AccUserImage.nativeElement.files[0].name);
      formData.append('file', this.AccUserImage.nativeElement.files[0]);
      formData.append('key', this.submitForm.value.key);
      this.dS.decryptFile(formData)
        .subscribe(
          (response: any) => {
            this.fileReady = true;
            console.log(response);
          },
          (error) => {
            alert('File cannot be decrypted : ' +
              'Either file is not valid or ' +
              'Password is incorrect');
            console.log(error);
          }
        );
    } else {
      alert('Please select a file to be decrypted !!!');
    }
  }

  onDownload() {
    window.location.href = '/pepcuscapability-showcase/decrypt/file?filename=' + this.filename;
    this.isFileSelected = false;
    this.fileReady = false;
    this.submitForm.reset();
  }
}
