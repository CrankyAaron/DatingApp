import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private toastr: ToastrService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error) {
                    switch (error.status) {
                        case 400:
                            if (error.error.errors) {
                                // errors from the server
                                const modelStateErrors = [];
                                for (const key in error.error.errors) {
                                    if (error.error.errors[key]) {
                                        modelStateErrors.push(error.error.errors[key]);
                                    }
                                }
                                throw modelStateErrors.flat(); // makes arrays one array
                            }
                            else {
                                // for the errors we made
                                this.toastr.error(error.error, error.status.toString());
                            }
                            break;
                        case 401:
                            this.toastr.error('Unauthorised', error.status.toString())
                            break;
                        case 404:
                            this.router.navigateByUrl('/not-found');
                            break;
                        case 500:
                            const navigationsExtras: NavigationExtras = { state: { error: error.error } };
                            this.router.navigateByUrl('/server-error', navigationsExtras);
                            break;
                        default:
                            this.toastr.error("Unexpected error");
                            console.log(error);
                            break;


                    }
                }
                throw error;
            })
        );
    }

};
