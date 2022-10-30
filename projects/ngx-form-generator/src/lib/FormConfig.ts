import { ValidatorFn } from "@angular/forms";

export default interface FormConfig {
  [key: string]:
  | {
    disable?: boolean;
    validators?: ValidatorFn | ValidatorFn[] | null;
  }
  | FormConfig
  | FormConfig[];
}
