import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

/**
 * Show errors using toastr
 */
@Injectable()
export class ShowErrorService {

    /**
     * @ignore
     */
    constructor(
        private toastrService: NbToastrService
    ) { }

    /**
     * Show custom error message
     */
    show(errors) {
        errors.forEach(({ message }) => { 
            this.toastrService.show(
                message,
                'An error has occurred',
                { 
                  position: 'top-right' as any,
                  status: 'danger'
                }
            );
        });  
    }

    /**
     * Show default error message
     */
    showDefault() {
        this.toastrService.show(
            'Error',
            'An error has occurred',
            { 
              position: 'top-right' as any,
              status: 'danger'
            }
        );
    }
}