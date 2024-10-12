import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {AuthenticationService} from "../../../service/authentication.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],  // Asegúrate de proporcionar el servicio de mensajes
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    code: string = '';
    password: string = '';

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    login() {
        if (this.code && this.password) {
            // Llama al método de autenticación del AuthenticationService
            let request = {
                code: this.code,
                password: this.password
            }
            this.authService.login(request).subscribe({
                next: (response) => {
                    console.log(response)
                    if (response.success) {  // Asegúrate de manejar correctamente la respuesta del servidor
                        // Redirige al dashboard si el login es exitoso
                        console.log("entro")
                        this.authService.setTheme(response.dark_mode)
                        this.authService.setToken(response.token);
                        this.authService.redirectToDashboardIfLoggedIn();
                        //this.router.navigate(['/dashboard']);
                    } else {
                        console.log("datos erroneos")
                        // Muestra un mensaje de error si los datos son incorrectos
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Correo o contraseña incorrecta' });
                    }
                },
                error: (err) => {
                    // Maneja el caso de error del servidor
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error imprevisto, intente más tarde' });
                }
            });
        } else {
            // Muestra un mensaje de error si faltan campos
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese todos los campos' });
        }
    }
}
