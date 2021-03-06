import {Component, OnInit} from '@angular/core';
import {isNumber, log} from 'util';
import {_Request} from '../../../models/_Request';
import {User} from '../../../models/User';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../../../services/requests.service';
import {AuthService} from '../../../services/authService/auth.service';
import {DomSanitizer} from '@angular/platform-browser';
import {WindowRefService} from '../../../services/window-ref.service';
import {saveAs} from 'file-saver';
import {global} from '../../../global';

@Component({
    selector: 'app-student-request-attachment',
    templateUrl: './student-request-attachment.component.html',
    styleUrls: ['./student-request-attachment.component.css']
})
export class StudentRequestAttachmentComponent implements OnInit {

    public solicitud: _Request;
    public currentUser: User;
    fileUrl;
    public url: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private requestService: RequestsService,
                private authService: AuthService,
                private sanitizer: DomSanitizer,
                private winRef: WindowRefService) {
        this.url = global.url + 'download?filename=';
        this.currentUser = authService.currentUserValue;
    }


    ngOnInit() {
        this.route.params.subscribe(value => {
            let id = +value['id'];
            if (isNumber(id)) {
                this.loadRequest(id);
            }
        });
    }

    loadRequest(id: number) {
        this.requestService.getRequest(id).subscribe(response => {
            if (response.status === 'success') {
                this.solicitud = response.data;
                console.log(this.solicitud);
            }
        }, error => {
            console.log(error);
        });
    }
    download(attachment) {
        const newWindow = this.winRef.nativeWindow;
        console.log(attachment.route);
        this.requestService.downloadFile(attachment.route).subscribe(response => {
            saveAs(response, attachment.name);
        }, error => {
            console.log(error);

        });
    }
}
