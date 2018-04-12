import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LogService} from './log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private logService: LogService) {}

  @ViewChild('fFile') submitForm: NgForm;
  @ViewChild('AccUserImg') AccUserImage;

  isFileSelected = false;
  isLogGenerated = false;
  debugData: number;
  infoData: number;
  errorData: number;
  warnData: number;
  traceData: number;

  onFileChange() {
    if (this.AccUserImage.nativeElement.files[0].length !== 0) {
      this.isFileSelected = true;
    } else {
      this.isFileSelected = false;
    }
  }

  onSubmit() {
    const formData = new FormData();
      formData.append('file', this.AccUserImage.nativeElement.files[0]);
      formData.append('start', this.submitForm.value.start);
      formData.append('end', this.submitForm.value.end);
      this.logService.generateLog(formData)
        .subscribe(
          (response: any) => {
            console.log(response);
            this.isLogGenerated = true;
            this.debugData = response.log.debug;
            this.infoData = response.log.info;
            this.errorData = response.log.error;
            this.warnData = response.log.warn;
            this.traceData = response.log.trace;
          },
          (error) => {
            console.log(error);
            alert(error.error.message);
          }
        );
  }

  useSampleFile() {
    this.logService.sampleFile()
      .subscribe(
        (response: any) => {
          console.log(response);
          this.isLogGenerated = true;
          this.debugData = response.log.debug;
          this.infoData = response.log.info;
          this.errorData = response.log.error;
          this.warnData = response.log.warn;
          this.traceData = response.log.trace;
        },
        (error) => {
          console.log(error);
          alert(error.error.message);
        }
      );
  }
}
