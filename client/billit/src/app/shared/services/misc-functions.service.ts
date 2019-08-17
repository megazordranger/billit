import { Injectable } from '@angular/core';

/**
 * Service container of miscellaneous and general functions
 */
@Injectable()
export class MiscFunctionsService {

    /**
     * @ignore
     */
    constructor() { }

    /**
     * Function for copy object but not reference
     */
    copyObj(obj: object): object {
        return JSON.parse(JSON.stringify(obj));
    }
}