import {Routes} from '@angular/router';

export default [
    {
        path: 'order-summary/:id',
        data: { breadcrumb: 'Order Summary' },
        loadComponent: () => import('./ordersummary').then((c) => c.OrderSummary)
    }
] as Routes;
