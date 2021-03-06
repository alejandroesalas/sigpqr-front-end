import {Component, OnInit} from '@angular/core';
import {DynamicScriptLoaderService} from '../../services/dynamic-script-loader.service';
import {ProgramService} from '../../services/program/program.service';
import {Program} from '../../models/Program';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/User';
import {emailValidation, passwordValidation} from '../../customValidators/CustomValidators';
import {UserService} from '../../services/user/user.service';
import {StudentService} from '../../services/student/student.service';
import {Student} from '../../models/Student';
import {global, swal} from '../../global';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public programas: Program[];
    public regForm: FormGroup;
    public newUser: Student;
    public loading: boolean;

    constructor(private userService: UserService,
                private studentService: StudentService,
                private dynamicScriptLoader: DynamicScriptLoaderService,
                private programService: ProgramService,
                private router: Router) {
        this.loading = false;
        this.newUser = new User(0, '', '', '', '', 0, '', '', '',
            0, 0);
    }

    ngOnInit() {
        this.regForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+')]),
            lastname: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+')]),
            email: new FormControl('', {
                updateOn: 'blur',
                validators: [Validators.required, Validators.email,
                    Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')],
                asyncValidators: [emailValidation(this.userService)]
            }),
            password: new FormControl('', [Validators.required, Validators.pattern(global.patternPassword)
                , Validators.minLength(8)]),
            CPassword: new FormControl(''),
            _program: new FormControl('', Validators.required),
            id_type: new FormControl('', Validators.required),
            id_num: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
        });
        this.regForm.get('CPassword').setValidators([Validators.required, Validators.pattern(global.patternPassword),
            , passwordValidation(this.regForm.get('password')), Validators.minLength(8)]);
        this.loadPrograms();
    }

    private loadPrograms() {
        this.programService.getAll(false).subscribe(value => {
            this.programas = value.data;
        }, error => {
            console.log('errores', error);
        });
    }

    register() {
        this.loading = true;
        this.newUser = this.regForm.value;
        this.newUser.program_id = this.regForm.value._program;
        this.newUser.password_confirmation = this.regForm.value.CPassword;
        console.log(this.newUser);
        this.studentService.store(this.newUser).subscribe(response => {
            if (response.status === 'success') {
                this.loading = true;
                swal.fire({
                    title: 'Registro',
                    text: 'Usuario Registrado Con exito\n' +
                        'A su correo se le ha enviado un mensaje de activación de la cuenta',
                    type: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.value) {
                        this.router.navigate(['login']);
                    }
                });
            }
            this.regForm.reset();

        }, error => {
            swal.fire({
                title: 'Registro',
                text: error.error.message,
                type: 'error',
                confirmButtonText: 'OK'
            });
            this.loading = false;
            console.log(error);
        });

    }
}
