import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {CustomValidators} from "./custom-validators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup | undefined;

  ngOnInit() {

    this.projectForm = new FormGroup({
      'projectName': new FormControl(
        null,
        [Validators.required, CustomValidators.invalidProjectName]
      ),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('critical')
    });
  }

  onSaveProject() {
    // @ts-ignore
    console.log(this.projectForm.value);
  }
}
