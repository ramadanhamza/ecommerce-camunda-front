import {Routes} from '@angular/router';

export default [
    {
        path: 'order-summary/:id',
        data: { breadcrumb: 'Fiche de décision' },
        title: 'Fiche de décision',
        loadComponent: () => import('./ordersummary').then((c) => c.OrderSummary)
    },
    {
        path: 'promesse',
        data: { breadcrumb: 'Promesse' },
        title: 'Promesse',
        loadComponent: () => import('./promesse').then((c) => c.Promesse)
    }
] as Routes;
