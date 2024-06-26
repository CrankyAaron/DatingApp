import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent  {
    registerMode = false;
    users: any;

    constructor(private http: HttpClient) { }
    // ngOnInit(): void {
    //     this.getUsers();
    // }

    registerToggle() {
        this.registerMode = !this.registerMode;
    }

    cancelRegisterMode(event: boolean) {
        this.registerMode = event;
    }

    // private getUsers() {
    //     this.http.get(environment.apiUrl + 'users').subscribe({
    //         next: response => this.users = response,
    //         error: (error) => console.log(error),
    //         complete: () => { console.log("Request Complete"); }
    //     });
    // }
}
