import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscritptions = ['Basic', 'Advanced', 'Pro'];
  selectedSubs = "";

  @ViewChild("signUpForm") sgnForm: NgForm | undefined;

  onSubmit() {
    // @ts-ignore
    console.log(this.sgnForm.value);
  }
}
