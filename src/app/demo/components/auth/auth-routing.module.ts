import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        // Redirigir a la página de login si se accede a la ruta base del módulo de auth
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: '**', redirectTo: 'login' }  // Manejo de rutas no encontradas dentro de auth, redirigiendo a login
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
