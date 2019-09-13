import {Component, OnInit} from '@angular/core';
import {_Request, STATUS_TYPE} from '../../../models/_Request';
import {User} from '../../../models/User';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../../../services/requests.service';
import {AuthService} from '../../../services/authService/auth.service';
import {isNumber} from 'util';

@Component({
    selector: 'app-coordinator-requests-timeline',
    templateUrl: './coordinator-requests-timeline.component.html',
    styleUrls: ['./coordinator-requests-timeline.component.css']
})
export class CoordinatorRequestsTimelineComponent implements OnInit {

    public solicitud: _Request;
    public currentUser: User;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private requestService: RequestsService,
                private authService: AuthService) {
        this.currentUser = authService.currentUserValue;
    }

    ngOnInit() {
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
}
