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
  otp: string;
  isOtpSent = false;
  date: Date;
  loader = false;

  ngOnInit() {
  }

  constructor(private uS: UserService) {
  }

  onSubmit(name: HTMLInputElement, email: HTMLInputElement, number: HTMLInputElement) {
    this.isOtpSent = false;   // for second transaction
    this.loader = true;
    this.name = name.value;
    this.email = email.value;
    this.number = number.value;
    this.uS.userAuth(this.name, this.email, this.number)
      .subscribe(
        (response: any) => {
          alert('OTP has been Sent to your email : verify it');
          this.loader = false;
          console.log(response);
          this.isOtpSent = true;
          this.otp = response.use.otp;
          this.date = new Date();
          this.date.setMinutes(this.date.getMinutes() + 5);
        },
        (error) => {
          console.log(error);
          alert('You cannot be authenticate : ' + error.message);
          this.loader = false;
        }
      );
  }

  onVerify(otp: HTMLInputElement) {
    if (otp.value.toString()  !== this.otp.toString()) {
      alert('OTP Does not matched');
    } else if (new Date > this.date) {
      alert('Try again , Your OTP has been Expired !!! ');
      this.submitForm.reset();
      this.submitForm2.reset();
      this.isOtpSent = false;
    } else {
      alert(this.name.toUpperCase() + ' You have successfully authenticated');
      this.submitForm.reset();
      this.submitForm2.reset();
      this.isOtpSent = false;
    }
  }
}
