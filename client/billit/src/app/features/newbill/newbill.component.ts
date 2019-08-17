import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router  } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { MiscFunctionsService } from 'app/shared/services';
import { BillService, ShowErrorService } from 'app/shared/services';

/**
 * Shared mask configuration
 */
const maskOptions = {
  prefix: '',
  thousandsSeparatorSymbol: '.',
  decimalSymbol: ','
}

/**
 * Currency mask configuration
 */
const currencyMask = createNumberMask({
  suffix: ' $',
  allowDecimal: true,
  ...maskOptions
});

/**
 * Percentage mask configuration 
 */
const percentageMask = createNumberMask({
  suffix: ' %',
  allowDecimal: true,
  ...maskOptions
});

/**
 * Integer mask configuration
 */
const integerMask = createNumberMask({
  ...maskOptions
})

/**
 * New bill form component
 */
@Component({
  selector: 'app-newbill',
  templateUrl: './newbill.component.html',
  styleUrls: ['./newbill.component.scss']
})
export class NewbillComponent implements OnInit {


  /**
   * Reference to input that show total items billed
   */
  @ViewChild('totalItems', {static: false}) totalItems: ElementRef;
  /**
   * Reference to input that show subtotal currency  billed 
   */
  @ViewChild('subTotal', {static: false}) subTotal: ElementRef;
  /**
   * Reference to input that show total in taxes currency billed 
   */
  @ViewChild('totalTaxes', {static: false}) totalTaxes: ElementRef;
  /**
   * Reference to input that show total currency billed 
   */
  @ViewChild('total', {static: false}) total: ElementRef;

  /**
   * New bill reactive form
   */
  billForm: FormGroup;
  /**
   * Bill items reactive form array
   */
  items: FormArray;
  /**
   * State for show/hide loading spinner
   */
  public loading: boolean = false;
  /**
   * Submition state
   */
  public submit: boolean = false;
  /**
   * State for adding new bill item process
   */
  public addingItem: boolean = false; 
  /**
   * Masks store
   */
  public mask = {
    currency: currencyMask,
    percentage: percentageMask,
    integer: integerMask
  }

  /**
   * Injection dependencies
   */
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private miscFunc: MiscFunctionsService,
    private billService: BillService,
    private errorService: ShowErrorService,
  ) { }

  /**
   * Create reactive bill form
   */
  ngOnInit() {
    this.billForm = this.formBuilder.group({
      customer: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(150),
      ]],
      items: this.formBuilder.array([ this.createItem() ])
    });
  }

  /**
   * Getter for acces to bill form controls
   */
  get f() { return this.billForm.controls; }
  /**
   * Getter for acces to bill items form controls
   */
  get formItems() { return <FormArray>this.billForm.get('items'); }
  /**
   * Getter for acces to bill form value
   */
  get formValue() {
    const bill: any = this.miscFunc.copyObj(this.billForm.value);
    bill.items.shift();
    return bill;
  }

  /**
   * Add new item to bill form
   */
  createItem(value = {
    name: '',
    price: '',
    tax: '',
    numberItems: '',
    totalItem: ''
  }): FormGroup {

    const fb: any = this.formBuilder.group({
      name: [ value.name, [
        Validators.required,
        Validators.maxLength(150),
      ]],
      price: [ value.price, [
        Validators.required,
      ]],
      tax: [ value.tax, [
        Validators.required,
      ]],
      numberItems: [ value.numberItems, [
        Validators.required,
      ]],
      totalItem: [ value.totalItem, [
        Validators.required,
      ]],
    });

    const controls = Object.keys(value);
    controls.shift();

    for(let control of controls) {
      fb.get(control).valueChanges.subscribe(async val => { 
       
        const value = this.toInt(val);
        const ctrl = fb.get(control);
        ctrl.value = value;
        await fb.value;

        if(control !== 'totalItem') {

          const { price = 0, tax = 0, numberItems = 0 } = fb.value;
          const totalItem = (price * (tax/100 + 1) * numberItems).toFixed(2).replace(/\./, ',');

          fb.get('totalItem').patchValue('');
          fb.get('totalItem').patchValue(totalItem);
        }

        if(control === 'numberItems' && !value) {
          ctrl.setErrors({});
        }
      });
    }

    return fb;
  }

  /**
   * Get specific bill item form control
   */
  getItem(index, control){
    const { controls }: any = this.formItems.controls[index];
    return controls[control];
  }

  /**
   * Add new item to bill form
   */
  async addItem(): Promise<void> {
    this.addingItem = true;
    if(this.formItems.invalid) return;
    
    this.addingItem = false;
    const value = this.formItems.controls[0].value;

    Object.keys(value).forEach((key, index) => {
      if(index) {
        value[key] = value[key].toString().replace(/\./, ',');
      }
    });
    this.formItems.push(this.createItem(value));
    
    const { controls }: any = this.formItems.controls[0];
    for(let control of Object.keys(controls)) {
      await controls[control].patchValue('');
    }
    this.getTotals();
  }

  /**
   * Remove item of bill form
   */
  removeItem(index): void {
    this.items = this.billForm.get('items') as FormArray;
    this.items.removeAt(index);
    this.getTotals();
  }

  /**
   * Submit bill form value to database store
   */
  billIt() {
    this.submit = true;
  
    const bill = this.getTotals();
    const variables = {
      input: bill
    }
    
    this.showLoader();
    this.billService.createBill(variables).subscribe(({ data, errors }) => {
      this.hideLoader();

      if(errors) {
        console.log(errors);
        this.errorService.show(errors);
      } else {
        this.submit = false;
        this.billForm.reset();
        this.formItems.clear();
        this.formItems.push(this.createItem());
        this.router.navigateByUrl('/dashboard');
      }

    }, error => {
      this.hideLoader();
      console.log(error);
      this.errorService.showDefault();
    });
  }

  /**
   * Get and show totals and subtotals of bill
   */
  getTotals() {

    const { customer, items } = this.formValue;

    let totalItems = 0;
    let total = 0;
    let subTotal = 0;
    let totalTaxes = 0;

    items.forEach(({ price, tax, numberItems, totalItem }, i) => {

      price = this.toInt(price);
      tax = this.toInt(tax);
      numberItems = this.toInt(numberItems);
      totalItem = this.toInt(totalItem);

      items[i].price = price;
      items[i].tax = tax;
      items[i].numberItems = numberItems; 
      items[i].totalItem = totalItem; 
      
      totalItems += numberItems;
      total = +(total + price * (tax/100 + 1) * numberItems).toFixed(2);
      subTotal = +(subTotal + price * numberItems).toFixed(2);
      totalTaxes = +(totalTaxes + price * (tax/100) * numberItems).toFixed(2);
    });

    this.totalItems.nativeElement.value = totalItems;
    this.subTotal.nativeElement.value = subTotal.toString().replace(/\./, ',') + ' $';
    this.totalTaxes.nativeElement.value = totalTaxes.toString().replace(/\./, ',') + ' $';
    this.total.nativeElement.value = total.toString().replace(/\./, ',') + ' $';

    return {
      customer, 
      items
    }
  }

  /**
   * Show loading spinner
   */
  showLoader() {
    this.loading = true;
  }

  /**
   * Hide loading spinner
   */
  hideLoader() {
    this.loading = false;
  }

  /**
   * Convert mask result string to int 
   */
  toInt(val) {
    return +(val || '').replace(/\.|\$|%/g, '').replace(/,/g, '.');
  }
}
