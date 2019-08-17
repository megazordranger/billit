import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailValidator, ConfirmPasswordValidator } from 'app/shared/validators';
import { AuthService } from 'app/shared/services';
import { UniversalValidators } from 'ngx-validators'

/**
 * The component that containt the register form
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  /**
   * Variable for hide/show loading in submit button form,
   * deafult value us false (loading hide)
   */
  loading = false;
  /**
   * Reactive form variable for the login form
   */
  registerForm: FormGroup;
  /**
   * Mask configuration variable
   */
  public mask = Array(150).fill(/\S/);
  /**
   * Errors container array
   */
  public errors = [];

  /**
   * Injecting dependecies
   */
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService
  ) { }

   /**
   * Create register reactive form
   */
  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(150),
        UniversalValidators.noWhitespace
      ]],
      email: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(150),
        emailValidator
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      confirmPassword: ['', [
        Validators.required
      ]],
      checkPolicies: [false, [
        Validators.requiredTrue
      ]],
    },{
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  /**
   * Defining getter for register form controls
   */
  get f() { return this.registerForm.controls; }

  /**
   * Mehtod for change the value of policies checkbox in reactive form
   * 
   * @param checked 
   */
  toggle(checked: boolean) {
    this.f.checkPolicies.patchValue(checked);
  }

  /**
   * Method for trigger google social login
   */
  signInWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  /**
   * Trigger register process
   */
  async register() {
    this.showLoader();
    this.errors = [];
    const result: any = await this.authService.register(this.registerForm.value);

    if(result === true){
      this.registerForm.reset();
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
