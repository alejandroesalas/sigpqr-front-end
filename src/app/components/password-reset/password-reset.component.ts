import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PasswordService} from '../../services/passwords/password.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {emailValidation, passwordValidation} from '../../customValidators/CustomValidators';
import {global} from '../../global';

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
    public email: string;
    public password: string;
    public passwordConfirmation;
    private token: string;
    public resetPasswordForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private passwordService: PasswordService) {
        this.email = '';
    }

    ngOnInit() {
        this.checkForResetTokenPassword();
        this.resetPasswordForm = new FormGroup({
            email: new FormControl(this.email, {
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl('',[Validators.required, Validators.pattern(global.patternPassword)
                , Validators.minLength(8)]),
            CPassword: new FormControl('')
        });
        this.resetPasswordForm.get('CPassword').setValidators([Validators.required, Validators.pattern(global.patternPassword),
            , passwordValidation(this.resetPasswordForm.get('password')), Validators.minLength(8)]);
    }

    reset() {
        if (this.token) {
            this.email = this.resetPasswordForm.get('email').value;
            this.password = this.resetPasswordForm.get('password').value;
            this.passwordConfirmation = this.resetPasswordForm.get('CPassword').value;
            this.passwordService.resetPassword(this.token, this.email, this.password, this.passwordConfirmation).subscribe(response => {
                if (response.status == 'success') {
                    localStorage.removeItem('email');
                    this.router.navigate(['login']);
                }
            }, error => {
                this.router.navigate(['error']);
                console.log(error);
            });
        }
    }

    checkForResetTokenPassword() {
        this.route.params.subscribe(value => {
            this.token = value['tokenReset'];
            this.email = localStorage.getItem('email');
        });
    }

}
