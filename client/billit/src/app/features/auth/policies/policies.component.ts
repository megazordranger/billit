import { Component, OnInit } from '@angular/core';

/**
 * Container for term and condition of use
 */
@Component({
  selector: 'app-term-and-conditions',
  templateUrl: './term-and-conditions.component.html',
})
export class TermAndConditionsComponent { }

/**
 * Container for privacy police
 */
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
})
export class PrivacyPolicyComponent { }

/**
 * Container for disclaimer
 */
@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
})
export class DisclaimerComponent { }

/**
 * Container for cookie policy
 */
@Component({
  selector: 'app-cookie-policy',
  templateUrl: './cokie-policy.component.html',
})
export class CookiePolicyComponent { }

/**
 * Container for all policies components 
 */
@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {

  /**
   * Route tabset configuration
   * 
   * @see [NbRouteTabsetComponent]{@link https://akveo.github.io/nebular/docs/components/tabs/overview#nbroutetabsetcomponent}
   */
  tabs: any[] = [
    {
      title: 'Terms & Conditions',
      route: './term-and-conditions',
      responsive: true,
    },
    {
      title: 'Privacy Policy',
      route: './privacy-policy',
      responsive: true,
    },
    {
      title: 'Disclaimer',
      route: './disclaimer',
      responsive: true,
    },
    {
      title: 'Cookie Policy',
      route: './cookie-policy',
      responsive: true,
    }
  ];

  /**
   * @ignore
   */
  constructor() { }

   /**
   * @ignore
   */
  ngOnInit() {
  }

}
