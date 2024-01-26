import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthModel, AuthResponse, LoginRequestModel, RegisterRequestModel } from '../../models/auth.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarPanelClass } from 'src/app/common/models';
import { Router } from '@angular/router';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom'
SNACK_BAR_CONFIG.horizontalPosition = 'center'

@Component({
    selector: 'app-login-register',
    templateUrl: './login-register.component.html',
    styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
    public loginForm: FormGroup = new FormGroup({});
    public registerForm: FormGroup = new FormGroup({});
    public showPass = false;
    public isLogin = true;
    public autoComplete = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        public snackbar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.initLoginForm();
        this.initRegisterForm();
        this.checkRePass();
    }

    public initLoginForm(): void {
        this.loginForm = this.fb.group({
            username: new FormControl(null, {
                validators: [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,18}$/)]
            }),
            password: new FormControl(null, {
                validators: [Validators.required, Validators.pattern(/^[0-9a-zA-Z]{8,}$/)]
            })
        })
    }

    public initRegisterForm(): void {
        this.registerForm = this.fb.group({
            username: new FormControl(null, {
                validators: [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,18}$/)]
            }),
            password: new FormControl(null, {
                validators: [Validators.required, Validators.pattern(/^[0-9a-zA-Z]{8,}$/)]
            }),
            fullname: new FormControl(null, {
                validators: [Validators.required]
            }),
            email: new FormControl(null, {
                validators: [Validators.required, Validators.email]
            }),
            re_pass: new FormControl(null, {
                validators: [Validators.required],
                updateOn: 'blur'
            })
        })
    }

    public login(): void {
        const account: LoginRequestModel = {
            username: this.loginForm.get('username')?.value,
            password: this.loginForm.get('password')?.value
        }

        this.authService.onLogin(account).subscribe(
            (res: AuthResponse) => {
                let snackBarPanel = null;
                let message = '';

                if (res.status === 'SUCCESS') {
                    localStorage.setItem('account', JSON.stringify(res.data as AuthModel));

                    message = 'Đăng nhập thành công!';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.router.navigate(['home'])
                }
                else {
                    switch (Object.keys(res.data)[0]) {
                        case 'account':
                            message = 'Tên đăng nhập không tồn tại!';
                            break;
                        case 'password':
                            message = 'Mật khẩu không chính xác!';
                            break;
                    }

                    snackBarPanel = SnackBarPanelClass.errorClass;
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public checkRePass(): void {
        this.registerForm.get('re_pass')?.valueChanges.subscribe(
            value => {
                if (value !== this.registerForm.get('password')?.value) {
                    this.registerForm.get('re_pass')?.setErrors({ 'noMatch': true })
                }
            }
        )
    }

    public register(): void {
        const account: RegisterRequestModel = {
            username: this.registerForm.get('username')?.value,
            fullname: this.registerForm.get('fullname')?.value,
            email: this.registerForm.get('email')?.value,
            password: this.registerForm.get('password')?.value,
            rePass: this.registerForm.get('re_pass')?.value,
            avatar: 'assets/images/avatar-default-user.jpg',
            background: 'assets/images/background-default-user.jpg'
        }

        this.authService.onRegister(account).subscribe(
            (res: AuthResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Đăng ký không thành công!';

                if (res.status === 'SUCCESS') {
                    localStorage.setItem('account', JSON.stringify(res.data as AuthModel));

                    message = 'Đăng ký thành công!';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.router.navigate(['home'])
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }
}
