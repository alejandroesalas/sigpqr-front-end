import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/authService/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../../../services/requests.service';
import {User} from '../../../models/User';
import {_Request, STATUS_TYPE} from '../../../models/_Request';
import {REQUEST_TYPE} from '../../../models/_RequestType';

declare var loadAllResources;

@Component({
    selector: 'app-coordinator-requests',
    templateUrl: './coordinator-requests.component.html',
    styleUrls: ['./coordinator-requests.component.css']
})
export class CoordinatorRequestsComponent implements OnInit {
    public requestTyype: number;
    public currentUser;
    public requests: Array<_Request>;
    public mapRequests: Map<string, Array<_Request>>;

    constructor(private authService: AuthService,
                private route: ActivatedRoute,
                private router: Router,
                private requestService: RequestsService) {
        this.currentUser = authService.currentUserValue;
        this.requestTyype = 0;
        this.mapRequests = new Map<string, Array<_Request>>();
    }

    ngOnInit() {
        this.route.params.subscribe(value => {
            this.requestTyype = +value['typeReq'];
            if (this.requestTyype > 0) {
                this.loadRequest();
            }
        });
    }

    /**
     * load the requests by program and type
     */
    loadRequest() {
        this.requestService.getRequestByProgramAndType(this.requestTyype).subscribe(response => {
            if (response.status === 'success') {
                this.requests = response.data;
                console.log(response);
                this.mapRequests.set('open', this.requests.filter(theRequest => theRequest.status === STATUS_TYPE._open));
                this.mapRequests.set('onProcess', this.requests.filter(theRequest => theRequest.status === STATUS_TYPE._onProcess));
                this.mapRequests.set('closed', this.requests.filter(theRequest => theRequest.status === STATUS_TYPE._closed));
            }
        }, error => {
            console.log(error);
        });

    }
}
