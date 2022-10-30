import { FormArray, FormControl, FormGroup } from "@angular/forms";
import FormConfig from "./FormConfig";


export default function generateFormGroup<T>(data: T, config?: FormConfig): FormGroup {
  if (data) {
    const objectKeys = Object.keys(data);
    let formGroupData: any = {};
    objectKeys.forEach((key) => {
      let type = data[key] == null ? 'null' : typeof data[key];
      switch (type) {
        case 'object':
          if (Array.isArray(data[key])) {
            formGroupData[key] = new FormArray(
              (data[key] as any[]).map((arrayElement, idx) => {
                if (typeof arrayElement == 'object') {
                  return generateFormGroup(
                    arrayElement,
                    !!config ? (config[key][idx] as FormConfig) : undefined
                  );
                } else {
                  if (
                    config &&
                    config[key][idx] &&
                    !Array.isArray(config[key][idx])
                  ) {
                    return new FormControl(
                      {
                        value: data[key][idx],
                        disabled:
                          config != null && config[key][idx] != null
                            ? config[key][idx]['disable']
                            : false,
                      },
                      config[key][idx]['validators']
                    );
                  } else {
                    return new FormControl(data[key][idx]);
                  }
                }
              })
            );
          } else {
            formGroupData[key] = generateFormGroup(
              data[key],
              !!config ? (config[key] as FormConfig) : undefined
            );
          }
          break;
        default:
          if (config && config[key] && !Array.isArray(config[key])) {
            formGroupData[key] = new FormControl(
              {
                value: data[key],
                disabled:
                  config != null && config[key] != null
                    ? config[key]['disable']
                    : false,
              },
              config[key]['validators']
            );
          } else {
            formGroupData[key] = new FormControl(data[key]);
          }
          break;
      }
    });

    return new FormGroup(formGroupData);
  }

  return new FormGroup({});
}
