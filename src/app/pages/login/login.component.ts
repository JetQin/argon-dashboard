import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AlertService } from '../../service/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  message: any;
  username: string;
  password: string;
  returnUrl: string;
  loading = false;
  submitted = false;
  loginForm: FormGroup;

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      if (message && message.text) {
        this.message = message.text;
      }
    });
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  handleKeyEnter() {
   console.log('Key enter');
  }

  login() {
    console.log('sign in');
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.auth.login({
      username: this.f.username.value,
      password: this.f.password.value,
      grant_type: 'password'
    }).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log(error);
        this.alertService.error(error.error.error_description);
        this.loading = false;
      }

    );
  }
}

