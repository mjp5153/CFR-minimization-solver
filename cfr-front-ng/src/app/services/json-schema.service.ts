import Ajv from 'ajv';
import { Injectable } from '@angular/core';


/**
 * Code modified from: https://ajv.js.org/guide/getting-started.html#install
 */

/**
 * The validation result
 */
export interface ValidateResult {

  isValid: boolean;
  errorsText: string;
}


@Injectable({
  providedIn: 'root'
})
export class JSONSchemaService {

  constructor() {}


  /**
   * Validate data against a schema
   */
  public validate(schema: object, data: object): ValidateResult {
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const valid = validate(data);
    let errorText = '';
    if (!valid) {
      console.log(validate.errors);
      const error = validate.errors[validate.errors.length - 1];
      errorText = error.instancePath + ': ' + error.message;
    } else {
      console.log('Valid!');
    }

    return { isValid: valid, errorsText: errorText };
  }
}
