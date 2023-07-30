import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public users: any;
  public forgotPassForm!: FormGroup;
  public codeForm!: FormGroup;
  public changePassForm!: FormGroup;
  private emailValidation: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  public emailCheck: boolean = false;
  public first_forgot: boolean = true;
  public second_forgot: boolean = false;
  public third_forgot_change: boolean = false;
  public resetCode!: string;
  public currentForgotPassEmail!: string;
  public invalidCode: boolean = false;
  public fieldTextType!: boolean;
  public fieldTextType_2!: boolean;

  constructor(private userService: UserService, private router: Router, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.getAllCustomers();
    this.forgotPassForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailValidation)])
    });

    this.codeForm = new FormGroup({
      code: new FormControl('', Validators.required)
    });

    this.changePassForm = new FormGroup({
      newPass: new FormControl('', Validators.required),
      repeatNewPass: new FormControl('', Validators.required)
    });
  }

  setDE() {
    localStorage.setItem("lang", "de")
    window.location.reload();
  }

  setEN() {
    localStorage.setItem("lang", "en")
    window.location.reload();
  }

  setBG() {
    localStorage.setItem("lang", "bg")
    window.location.reload();
  }

  getAllCustomers() {
    this.userService.getCustomers().subscribe((res) => {
      this.users = res;
    })
  }

  forgot() {
    const email = this.forgotPassForm.get('email')?.value;
    const emailExists = this.users.some((user: any) => user.email === email);

    if (emailExists) {
      this.emailCheck = false;
      this.userService.sendForgotPasswordEmail(email).subscribe(
        (res) => {
          // Email sent successfully
          const translationKey = 'Email sent. Please check your inbox for further instructions.';
          this.translateService.get(translationKey).subscribe((translation: string) => {
            alert(translation);
            this.first_forgot = false;
            this.second_forgot = true;
            this.currentForgotPassEmail = email;
          });
        },
        (error) => {
          // Error sending email
          alert("Failed to send email. Please try again later.");
        }
      );
    } else {
      this.emailCheck = true;
    }
  }

  changePass() {
    const email = this.forgotPassForm.get('email')?.value;
    const newPassword = this.changePassForm.get('repeatNewPass')?.value;

    this.userService.updateCustomerPasswordByEmail(email, newPassword).subscribe(
      (response) => {
        // Handle the response after updating the password
        console.log('Password updated:', response);
      },
      (error) => {
        // Handle the error
        console.error('Error updating password:', error);
      }
    );

    this.router.navigate(['/login']);
  }

  verifyResetCode() {
    const email = this.forgotPassForm.get('email')?.value;
    const code = this.codeForm.get('code')?.value;

    this.userService.verifyResetCode(email, code)
      .subscribe((isValid) => {
        if (isValid) {
          this.second_forgot = false;
          this.third_forgot_change = true;
        } else {
          this.invalidCode = true;
        }
      });
  }


  public reset(): void {
    Object.keys(this.changePassForm.controls).forEach((key) => {
      this.changePassForm.get(key)!.reset();
      this.changePassForm.get(key)!.enable({ onlySelf: true });
    })
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldTextType_2() {
    this.fieldTextType_2 = !this.fieldTextType_2;
  }

}
