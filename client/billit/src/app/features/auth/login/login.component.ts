import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbIconLibraries } from '@nebular/theme';
import { AuthService } from 'app/shared/services';
import { UniversalValidators } from 'ngx-validators'

/**
 * The component that containt the login form
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * Variable for hide/show loading in submit button form,
   * deafult value us false (loading hide)
   */
  loading = false;
  /**
   * Reactive form variable for the login form
   */
  loginForm: FormGroup;
  /**
   * Mask configuration variable
   */
  public mask = Array(30).fill(/\S/);
  /**
   * Errors container array
   */
  public errors = [];

  /**
   * Injecting dependecies and setting default icon library
   */
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private iconLibraries: NbIconLibraries
  ) { 
    this.iconLibraries.setDefaultPack('eva');
  }

  /**
   * Create login reactive form
   */
  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(150),
        UniversalValidators.noWhitespace
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    }); 
  }
  
  /**
   * Defining getter for login form controls
   */
  get f() { return this.loginForm.controls; }

  /**
   * Method for trigger google social login
   */
  signInWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  /**
   * Trigger login process
   */
  async login() {
    this.showLoader();
    this.errors = [];
    const result: any = await this.authService.login(this.loginForm.value);
    
    if(result === true){
      this.loginForm.reset();
    } else {
      result.forEach(error => {
        this.errors.push(error.message);
      });
    }
    this.hideLoader();
  }

  /**
   * Show button form spinner
   */
  showLoader() {
    this.loading = true;
  }

  /**
   * Hide button form spinner
   */
  hideLoader() {
    this.loading = false;
  }
}
