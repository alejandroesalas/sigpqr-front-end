import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {global} from '../../global';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PasswordService {

    constructor(private http: HttpClient) {
    }

    resetPassword(token, email, password, passwordConfirmation) {
        const formData = new FormData();
        formData.set( 'token', token);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('password_confirmation', passwordConfirmation);
        return this.http.post<any>(global.url + `password/reset`, formData);
    }

    senEmailReset(email: string): Observable<any> {
        const formData = new FormData();
        formData.set('email', email);
        return this.http.post<any>(global.url + `password/email`, formData);
    }
}
