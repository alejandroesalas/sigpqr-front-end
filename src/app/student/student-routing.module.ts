import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
//componentes del modulo
import {StudentComponent} from './student.component';
import {HomeStudentComponent} from './components/home-student/home-student.component';
import {StudenRequestsComponent} from './components/studen-requests/studen-requests.component';
import {StudentProfileComponent} from './components/student-profile/student-profile.component';
import {AuthGuard} from '../guards/auth.guard';
import {Profile} from '../models/Profile';
import {RequestsAddComponent} from './components/requests-add/requests-add.component';
import {RequestsTimelineComponent} from './components/requests-timeline/requests-timeline.component';
import {CoordinatorRequestsReplyComponent} from '../coordinator/components/coordinator-requests-reply/coordinator-requests-reply.component';
import {RequestResponseComponent} from './components/request-response/request-response.component';
import {StudentRequestAttachmentComponent} from './components/student-request-attachment/student-request-attachment.component';


const studentRoutes: Routes = [
    {path: 'logout/:sure', component: StudentComponent},
    {
        path: 'student', component: StudentComponent,
        canActivate: [AuthGuard],
        data: {rol: Profile.student},
        children: [
            {path: '', component: HomeStudentComponent},
            {
                path: 'requests', children: [
                    {path: '', component: StudenRequestsComponent},
                    {path: 'add', component: RequestsAddComponent},
                    {path: ':idReq/reply', component: RequestResponseComponent},
                    {path: ':id/timeline', component: RequestsTimelineComponent},
                    {path: ':id/adjuntos', component: StudentRequestAttachmentComponent}
                ]
            },
            {path: 'profile', component: StudentProfileComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(studentRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class StudentRoutingModule {
}
