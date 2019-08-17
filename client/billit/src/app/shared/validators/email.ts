import { AbstractControl } from '@angular/forms';

/**
 * Validate email format
 */
export function emailValidator(control: AbstractControl): { [key: string]: any } | null {
  const valid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(control.value);
  return valid ? null : { invalidEmail: { valid: false, value: control.value } };
}