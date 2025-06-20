import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {Table, TableModule} from 'primeng/table';
import {ProgressBarModule} from 'primeng/progressbar';
import {CustomerService} from '@/pages/service/customer.service';
import {Router} from '@angular/router';
import {Customer} from '@/types/customer';
import {ButtonModule} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import { TasksService } from '../service/tasks.service';
import { Order } from '@/types/order';

@Component({
    selector: 'user-list',
    standalone: true,
    imports: [CommonModule, TableModule, InputTextModule, ProgressBarModule, ButtonModule, IconField, InputIcon],
    template: `<div class="card">
        <p-table
            #dt
            [value]="orders"
            [paginator]="true"
            paginatorDropdownAppendTo="body"
            [rows]="10"
            [showCurrentPageReport]="true"
            responsiveLayout="scroll"
            currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} entrées"
            [rowsPerPageOptions]="[10, 25, 50]"
            [globalFilterFields]="['name', 'country.name', 'representative.name']"
        >
            <ng-template #caption>
                <div class="flex flex-wrap gap-2 items-center justify-between">
                    <p-icon-field class="w-full sm:w-80 order-1 sm:order-none">
                        <p-inputicon class="pi pi-search" />
                        <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Chercher..." class="w-full" />
                    </p-icon-field>
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    <th pSortableColumn="id" class="white-space-nowrap" style="width:10%"><span class="flex items-center gap-2">ID <p-sortIcon field="id"></p-sortIcon></span></th>
                    <th pSortableColumn="nomClient" class="white-space-nowrap" style="width:25%"><span class="flex items-center gap-2">Nom du client <p-sortIcon field="nomClient"></p-sortIcon></span></th>
                    <th pSortableColumn="amountToBorrow" class="white-space-nowrap" style="width:15%"><span class="flex items-center gap-2">Montant <p-sortIcon field="amountToBorrow"></p-sortIcon></span></th>
                    <th pSortableColumn="decision" class="white-space-nowrap" style="width:25%"><span class="flex items-center gap-2">Décision <p-sortIcon field="decision"></p-sortIcon></span></th>
                    <th pSortableColumn="signature" class="white-space-nowrap" style="width:25%"><span class="flex items-center gap-2">Signature <p-sortIcon field="signature"></p-sortIcon></span></th>
                </tr>
            </ng-template>
            <ng-template #body let-order>
                <tr>
                    <td>{{ order.id }}</td>
                    <td>John Doe</td>
                    <td>{{ order.amountToBorrow }}</td>
                    <td><p-button [label]="order.decision ? 'Accepté' : 'Refusé'" [severity]="order.decision ? 'success' : 'danger'" outlined/></td>
                    <td><p-button label="Non signé" severity="warn" outlined/></td>
                    
                </tr>
            </ng-template>
        </p-table>
    </div>`,
    providers: [CustomerService]
})
export class UserList {
    customers: Customer[] = [];
    orders: Order[] = [];

    constructor(
        private customerService: CustomerService,
        private tasksService: TasksService,
        private router: Router
    ) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => (this.customers = customers));
        this.tasksService.findAllOrders().subscribe((orders: any) => {
            this.orders = orders;
            console.log("data : ", orders);
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    navigateToCreateUser() {
        this.router.navigate(['profile/create']);
    }
}
