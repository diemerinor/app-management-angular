import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly TOKEN_KEY = 'authToken';  // Clave para el almacenamiento del token en localStorage
    private readonly endpoint = '/api/auth/login';  // Endpoint de login, cámbialo según sea necesario

    constructor(private http: HttpClient, private router: Router) {}

    // Método para autenticar al usuario
    login(request): Observable<any> {
        return this.http.post('http://localhost:3001'+this.endpoint, request);
    }

    // Método para guardar el token después de un login exitoso
    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    // Método para obtener el token almacenado
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    // Método para verificar si el usuario está autenticado
    isLoggedIn(): boolean {
        // Verificamos si el token está presente en el localStorage
        const token = this.getToken();
        return !!token;
    }

    // Método para realizar el logout del usuario
    logout(): void {
        // Eliminamos el token del localStorage
        localStorage.removeItem(this.TOKEN_KEY);
        // Redirigimos al usuario al módulo de autenticación
        this.router.navigate(['/auth/login']);
    }

    // Método para redirigir al dashboard si el usuario está autenticado
    redirectToDashboardIfLoggedIn(): void {
        if (this.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
        }
    }
}
