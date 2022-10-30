import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { generateFormGroup, FormConfig } from "ngx-form-generator2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';

  constructor() {
    const data: Person = {
      name: '',
      age: 0
    }


    const config: FormConfig = {
      name: {
        validators: [Validators.required]
      }
    }

    const formGroup = generateFormGroup<Person>(data, config);

    console.log(JSON.stringify(formGroup.controls.name.errors));

  }
}
interface Person {
  name: string;
  age: number;
}
