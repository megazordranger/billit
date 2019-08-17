import { AbstractControl } from '@angular/forms';

/**
 * Validate if password and password confirmation are the same
 */
export class ConfirmPasswordValidator {
    /**
     * Math passwords method
     */
    static MatchPassword(control: AbstractControl) {
       let password = control.get('password').value;

       let confirmPassword = control.get('confirmPassword').value;

        if(password !== confirmPassword) {
            control.get('confirmPassword').setErrors( {ConfirmPassword: true} );
        } else {
            return null
        }
    }
}