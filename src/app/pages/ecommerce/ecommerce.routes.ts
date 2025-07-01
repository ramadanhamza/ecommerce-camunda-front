import {Routes} from '@angular/router';

export default [
    {
        path: 'order-summary/:id',
        data: { breadcrumb: 'Order Summary' },
        loadComponent: () => import('./ordersummary').then((c) => c.OrderSummary)
    },
    {
        path: 'promesse',
        data: { breadcrumb: 'Promesse' },
        loadComponent: () => import('./promesse').then((c) => c.Promesse)
    }
] as Routes;
