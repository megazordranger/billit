import { Component, OnInit } from '@angular/core';

/**
 * Component with contact information
 */
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  /**
   * Array of contact points details
   */
  public contacts = [
    {
      source: 'Email',
      link: 'mailto:admin@billit.tk',
      text: 'admin@billit.tk',
      target: '_top'
    },
    {
      source: 'Github',
      link: 'https://github.com/megazordranger',
      text: 'megazordranger',
      target: '_blank'
    }
  ]

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
