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

  ngOnInit() {
  }

  constructor(private uS: UserService) {
  }

  onSubmit(name: HTMLInputElement, email: HTMLInputElement, number: HTMLInputElement, password: HTMLInputElement) {
    this.name = name.value;
    this.email = email.value;
    this.number = number.value;
    this.uS.userAuth(this.name, this.email, this.number)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.isOtpSent = true;
          this.otp = response.use.otp;
          this.date = new Date();
          this.date.setMinutes(this.date.getMinutes() + 5);
        },
        (error) => {
          console.log(error);
          alert('You cannot be authenticate : ' + error.message);
        }
      );
  }

  onVerify(otp: HTMLInputElement) {
    if (this.otp !== otp.value) {
      alert('OTP Does not matched');
    } else if (new Date > this.date) {
      alert('Try again , Your OTP has been Expired !!! ');
    } else {
      alert(this.name + ' You have successfully authenticated');
    }
  }
}
