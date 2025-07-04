import { Routes } from '@angular/router';
import { UserList } from './userlist';

export default [
    { path: '', redirectTo: 'demandes-financement', pathMatch: 'full' },
    { path: 'demandes-financement', title: 'Demandes de financement', data: { breadcrumb: 'Demandes de financement' }, component: UserList },
] as Routes;
