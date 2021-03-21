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
    if (!valid) {
      console.log(validate.errors);
    } else {
      console.log('Valid!');
    }

    return { isValid: valid, errorsText: JSON.stringify(validate.errors) };
  }
}
