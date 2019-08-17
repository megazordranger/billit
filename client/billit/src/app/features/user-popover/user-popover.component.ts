import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/services'

/**
 * Popover component for logout
 */
@Component({
  selector: 'ngx-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.scss']
})
export class UserPopoverComponent implements OnInit {

  /**
   * Injectin authentication service
   */
  constructor(
    private authService: AuthService
  ) { }

  /**
   * Trigger resize event for force view actualization and show popover in time, otherwise popover is show with delay
   */
  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
  }

  /**
   * Trigger logout
   */
  signOut(): void { 
    this.authService.logout();
  }
}
