import {Component, OnInit} from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {_Request, STATUS_TYPE} from '../../../models/_Request';
import {User} from '../../../models/User';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../../../services/requests.service';
import {AuthService} from '../../../services/authService/auth.service';
import {isNumber} from 'util';
import {AngularFileUploaderComponent} from 'angular-file-uploader';
import {global} from '../../../global';
import {_Response} from '../../../models/_Response';
import {MatSnackBar} from '@angular/material';

declare var loadAllResources;

@Component({
    selector: 'app-coordinator-requests-reply',
    templateUrl: './coordinator-requests-reply.component.html',
    styleUrls: ['./coordinator-requests-reply.component.css']
})
export class CoordinatorRequestsReplyComponent implements OnInit {

    public solicitud: _Request;
    public respuesta: _Response;
    public currentUser: User;
    public afuConfig;
    private fileUpload1: AngularFileUploaderComponent;
    public Editor = DecoupledEditor;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private requestService: RequestsService,
                private authService: AuthService,
                private _snackBar: MatSnackBar) {
        this.currentUser = authService.currentUserValue;
        this.afuConfig = {
            multiple: true,
            formatsAllowed: '.jpg,.png,.pdf,.docx',
            maxSize: '10',
            uploadAPI: {
                url: global.url + 'requests/uploadFiles',
                headers: {
                    Authorization: 'Bearer ' + this.currentUser.token
                }
            },
            theme: 'dragNDrop',
            hideProgressBar: false,
            hideResetBtn: true,
            hideSelectBtn: false,
            attachPinText: 'Selecciona archivos',
            replaceTexts: {
                selectFileBtn: 'Seleccionar archivos',
                resetBtn: 'Reset',
                uploadBtn: 'Cargar',
                dragNDropBox: 'Arrastra y suelta archivos dentro del cuadro',
                attachPinBtn: 'Adjunta archivos',
                afterUploadMsg_success: 'Archivos cargados con exito',
                afterUploadMsg_error: 'No se ha podido subir los archivos'
            }
        };
        this.respuesta = new _Response(0, '', '', '', 0, 0, 0, '');
    }

    ngOnInit() {
        loadAllResources();
        this.route.params.subscribe(value => {
            const id = +value['idReq'];
            if (isNumber(id)) {
                this.loadRequest(id);
            }
        });
    }

    loadRequest(id: number) {
        this.requestService.getRequest(id).subscribe(response => {
            if (response.status === 'success') {
                this.solicitud = response.data;
            }
        }, error => {
            console.log(error);
        });


    }

    isRequestOpen(): boolean {
        return this.solicitud.status === STATUS_TYPE._open;
    }

    createResponse(regResponse) {
        this.respuesta.request_id = this.solicitud.id;
        this.respuesta.type = this.solicitud.request_type_id;
        this.respuesta.user_email = this.currentUser.email;
        console.log(this.respuesta);
        this.requestService.CreateResponse(this.respuesta).subscribe(response => {
            if (response.status === 'success') {
                this._snackBar.open('Su Respuesta ha sido enviada con exito', 'X', {
                    duration: 3000,
                });
                console.log(response);
                regResponse.reset();
                this.router.navigate(['../../']);
            }

        }, error => {
            console.log(error);
        });
    }

    uploadedFiles(data) {
        const dat = JSON.parse(data.response);
        this.respuesta.attachments = dat.data;
    }
}
