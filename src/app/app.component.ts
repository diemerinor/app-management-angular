import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
        }
    }
}
