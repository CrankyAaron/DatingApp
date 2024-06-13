import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
    @Input() usersFromHomeComponent: any;
    @Output() cancelRegister = new EventEmitter();
    model: any = {};

    constructor(private accountSer: AccountService, private toastr: ToastrService) { }


    ngOnInit(): void {
    }

    register() {
        this.accountSer.register(this.model).subscribe({
            next: response => {
                this.cancel();
            },
            error: e => this.toastr.error(e.error)
        });
    }

    cancel() {
        this.cancelRegister.emit(false);
    }

}
