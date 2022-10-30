# NgxFormGenerator

This is a package created to help you with the instantiation of the FormGroup object

## Basic Usage

```ts
import { generateFormGrop } from "ngx-form-generator2";

interface Person {
  name: string;
  age: number;
}

const data:Person{
  name:'',
  age:0
}

const formGroup = generateFormGroup<Person>(data, config);

console.log(JSON.stringify(formGroup.value));

// {
//   "name":"",
//   "age":0
// }
```

## Basic Configuration

For adding Validation

```ts
import { Validators } from '@angular/forms';
import { generateFormGrop, FormConfig } from "ngx-form-generator2";

interface Person {
  name: string;
  age: number;
}

const data:Person{
  name:'',
  age:0
}

const congfig: FormConfig={
  name:{
    validators: [Validators.required]
  }
}

const formGroup = generateFormGroup<Person>(data, config);

console.log(JSON.stringify(formGroup.controls.name.errors));

//  {
//    "required":true
//  }
```

```ts
import { generateFormGrop, FormConfig } from "ngx-form-generator2";

interface Person {
  name: string;
  age: number;
}

const data:Person{
  name:'',
  age:0
}

const congfig: FormConfig={
  name: {
    disabled: true
  }
}

const formGroup = generateFormGroup<Person>(data, config);

console.log(JSON.stringify(formGroup.value));

//  {
//    "age":0
//  }
```
