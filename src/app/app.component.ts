import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from './user.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('f') submitForm: NgForm;
  @ViewChild('f2') submitForm2: NgForm;
  email: string;
  name: string;
  number: string;
  password: string;
  otp: string;
  isOtpSent = false;
  date: Date;

  expiryTime: string;

  ngOnInit() {
  }

  constructor(private uS: UserService) {
  }

  onSubmit(name: HTMLInputElement, email: HTMLInputElement, number: HTMLInputElement, password: HTMLInputElement) {
    this.name = name.value;
    this.email = email.value;
    this.number = number.value;
    this.password = password.value;
    this.uS.userAuth(this.name, this.email, this.number)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.isOtpSent = true;
          this.otp = response.use.otp;
          this.date = new Date();
          this.date.setMinutes(this.date.getMinutes() + response.use.expiryTime);
        },
        (error) => {
          console.log(error);
          alert('You cannot be authenticate : ' + error.message);
        }
      );
  }

  onVerify(otp: HTMLInputElement) {
    this.otp = otp.value;
    this.uS.userVerify(this.otp, this.email)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.isOtpSent = false;
          this.submitForm.reset();
          this.submitForm2.reset();
          alert(this.name + ' You have successfully authenticated');
        },
        (error) => {
          console.log(error);
          alert('Authorization Failed : ' + error.error.message);
        }
      );
  }
}
