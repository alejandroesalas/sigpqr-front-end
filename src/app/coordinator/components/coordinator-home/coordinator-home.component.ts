import {Component, OnInit} from '@angular/core';
import {DynamicScriptLoaderService} from '../../../services/dynamic-script-loader.service';
import {RequestsService} from '../../../services/requests.service';

declare const loadCollapsiblle: any;

@Component({
    selector: 'coordinator-home',
    templateUrl: './coordinator-home.component.html',
    styleUrls: ['./coordinator-home.component.css']
})
export class CoordinatorHomeComponent implements OnInit {

    constructor(private dynamicScriptLoader: DynamicScriptLoaderService,
                private requestService: RequestsService) {
    }

    ngOnInit() {
        loadCollapsiblle();
    }

    private loadScripts() {
        this.dynamicScriptLoader.load('dashboard-pro', 'general').then(data => {
        }).catch(error => console.log(error));
    }
}
