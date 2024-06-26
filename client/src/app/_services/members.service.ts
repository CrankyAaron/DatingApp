import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { AccountService } from './account.service';

@Injectable({
    providedIn: 'root'
})
export class MembersService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient, private accountService: AccountService) { }

    getMembers() {
        return this.http.get<Member[]>(this.baseUrl + 'users', this.getHttpOptions())
    }

    getMember(username: string) {
        return this.http.get<Member>(this.baseUrl + 'users/' + username, this.getHttpOptions())
    }

    getHttpOptions() {
        return {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.accountService.currentUser()?.token
            })
        }

    }
}
