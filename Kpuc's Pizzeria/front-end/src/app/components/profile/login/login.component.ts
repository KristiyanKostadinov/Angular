import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

const API_LOGIN: string = "https://localhost:3000/customers/login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public users: any;
  public fieldTextType!: boolean;
  public loginForm!: FormGroup;
private letters: RegExp = /^[A-Za-zа-яА-Я]+$/;

  constructor(private router: Router, private userService: UserService, private authService: AuthService, private http: HttpClient, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.getAllCustomers();

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern(this.letters)]),
      password: new FormControl('', Validators.required),
    })
  }

  getAllCustomers() {
    this.userService.getCustomers().subscribe((res) => {
      this.users = res;
    });
  }

  // login(loginForm: NgForm) {
  //   const { username, password } = loginForm.value;
  //   const user = this.users.find((u: any) => u.username === username && u.password === password);

  //   if (user) {
  //     localStorage.setItem("isLoggedIn", "true");
  //     localStorage.setItem("typeOfLogin", user.role);

  //     if (user.role === 'admin') {
  //       this.router.navigate(['admin']);
  //     } else if (user.role === 'employee') {
  //       this.router.navigate(['employee']);
  //     } else if (user.role === 'customer') {
  //       this.router.navigate(['customer']);
  //     } else if (user.role === 'anonymous') {
  //       this.router.navigate(['anonymous']);
  //     }
  //   } else {
  //     alert("Invalid username or password");
  //   }
  // }

  login() {
    const username = this.loginForm.get("username")?.value;
    const password = this.loginForm.get("password")?.value;

    this.http.post<any>(API_LOGIN, { username, password }).subscribe(
      (res) => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("typeOfLogin", res.role);
        this.authService.setLoggedInUser(res);
        if (res.role === 'admin') {
          this.router.navigate(['admin']);
        } else if (res.role === 'employee') {
          this.router.navigate(['employee']);
        } else if (res.role === 'customer') {
          this.router.navigate(['customer']);
        } else if (res.role === 'anonymous') {
          this.router.navigate(['anonymous']);
        }
      },
      (error) => {
        alert("Invalid username or password");
      }
    );
  }

  anonymous() {
    const translationKey = 'Be aware that without an account your order will not be saved to your profile!';
    this.translateService.get(translationKey).subscribe((translation: string) => {
      if (confirm(translation)) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("typeOfLogin", "anonymous");
        this.router.navigate(['/home']);
      }
    });
  }

  setDE() {
    localStorage.setItem("lang", "de")
    window.location.reload();
  }

  setEN() {
    localStorage.setItem("lang", "en")
    window.location.reload();
    // this.translateService.use("en");
    // window.location.reload();
  }

  setBG() {
    localStorage.setItem("lang", "bg")
    window.location.reload();
  }

  signUp() {
    this.router.navigate(['/sign-up']);
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
