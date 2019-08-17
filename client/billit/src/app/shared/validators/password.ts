import { AbstractControl } from '@angular/forms';

/**
 * Validate that pasword contains at least 1 letter and 1 number
 */
export function passwordValidator(control: AbstractControl): { [key: string]: any } | null {
  /**
   * @deprecated Due to only allow alphanumeric characters
   * 
   * // const valid = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(control.value);
   */
 
  const valid = /((\d.*[a-z])|([a-z].*\d))/i.test(control.value);
  return valid ? null : { invalidPassword: { valid: false, value: control.value } };
}

