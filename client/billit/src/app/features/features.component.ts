import { Component, OnInit } from '@angular/core';
import { UserPopoverComponent } from './user-popover/user-popover.component'
import { NbSidebarService, NbMenuItem, NbIconLibraries } from '@nebular/theme';
import { BillService } from 'app/shared/services'; 

/**
 * Container for all app views
 */
@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  /**
   * Side menu items configuration
   */
  public MENU_ITEMS: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'list-alt',
      link: '/dashboard',
    },
    {
      title: 'New Bill',
      icon: 'file-invoice-dollar',
      link: '/newbill',
    }
  ];

  /**
   * Userbname store variable
   */
  public username;
  /**
   * Menu configuration store variable
   */
  public menu = this.MENU_ITEMS;
  /**
   * Popover component for logout
   */
  public userComponent = UserPopoverComponent;
  /**
   * Current date store variable
   */
  public currentYear =  new Date().getFullYear();

  /**
   * Injecting dependecies and setting default icon library
   */
  constructor(
    private sidebarService: NbSidebarService,
    private billService: BillService,
    private iconLibraries: NbIconLibraries
  ) {
    this.iconLibraries.registerFontPack('@fortawesome/fontawesome-free', { iconClassPrefix: 'fa', packClass: 'fas' });
    this.iconLibraries.setDefaultPack('@fortawesome/fontawesome-free');
  }

  /**
   * Get iser data
   */
  ngOnInit() {
    this.billService.getUser()
    .subscribe(({ data, errors }) => {
      if(errors) console.log(errors);

      if(data) {
        const { user } = data as any;
        this.username = user.username;
      } 
    }, (error) => console.log(error));
  }

  /**
   * Toggle side menu
   */
  toggle() {
    this.sidebarService.toggle(true);
  }

}
