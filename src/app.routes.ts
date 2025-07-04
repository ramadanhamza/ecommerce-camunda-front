import { Routes } from '@angular/router';
import { AppLayout } from '@/layout/components/app.layout';
import { Notfound } from '@/pages/notfound/notfound';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            {
                path: '',
                redirectTo: 'profile', pathMatch: 'full'
            },
            {
                path: 'pages',
                loadChildren: () => import('@/pages/pages.routes'),
            },
            {
                path: 'ecommerce',
                loadChildren: () =>
                    import('@/pages/ecommerce/ecommerce.routes'),
                data: { breadcrumb: 'Demandes de financement' },
            },
            {
                path: 'profile',
                loadChildren: () => import('@/pages/usermanagement/usermanagement.routes'),
            },
        ],
    },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' },
];
