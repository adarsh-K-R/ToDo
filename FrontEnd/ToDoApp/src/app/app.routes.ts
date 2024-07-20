import { Routes } from '@angular/router';
import { AuthenticationComponent } from './shared/components/authentication/authentication.component';
import { HomeComponent } from './shared/components/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { ActiveComponent } from './tasks/components/active/active.component';
import { CompletedComponent } from './tasks/components/completed/completed.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        canActivate: [authGuard],
        children: [
            { 
                path: 'active', 
                component: ActiveComponent,
                canActivate: [authGuard] 
            },
            { 
                path: 'completed', 
                component: CompletedComponent ,
                canActivate: [authGuard]
            },
          ],
    },
    {
        path: "auth",
        component: AuthenticationComponent        
    }
];
