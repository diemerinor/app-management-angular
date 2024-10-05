import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
                public router: Router,
                public authService: AuthService,) { }

    redirectOnClick() {
        if (this.authService.isLoggedIn()) {
            // Redirige al dashboard si el usuario está autenticado
            this.router.navigate(['/dashboard']);
        } else {
            // Redirige al login si no está autenticado
            this.router.navigate(['/auth/login']);
        }
    }

    logout() {
        this.authService.logout();
    }
}
