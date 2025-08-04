import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {Table, TableModule} from 'primeng/table';
import {ProgressBarModule} from 'primeng/progressbar';
import {CustomerService} from '@/pages/service/customer.service';
import {Router} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {TagModule} from 'primeng/tag';
import { TasksService } from '../service/tasks.service';
import { TaskDto } from '@/types/taskDto';

@Component({
    selector: 'user-list',
    standalone: true,
    imports: [CommonModule, TableModule, InputTextModule, ProgressBarModule, ButtonModule, IconFieldModule, InputIconModule, TagModule],
    template: `<div class="card">
    <h2 class="text-2xl font-bold mb-4">Demandes de financement</h2>

    <p-table
        #dt
        [value]="taskDtos"
        [paginator]="true"
        paginatorDropdownAppendTo="body"
        [rows]="10"
        [rowsPerPageOptions]="[10, 25, 50]"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} demandes"
        responsiveLayout="scroll"
        [loading]="loading"
        stateStorage="session" 
        stateKey="financement-requests-table"
        [globalFilterFields]="['order.id', 'order.clientName', 'order.borrowAmount', 'decision']">

        <ng-template pTemplate="caption" >
            <p-icon-field iconPosition="left">
                <p-inputicon class="pi pi-search" />
                <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Chercher une demande..." class="w-full sm:w-auto" />
            </p-icon-field>
        </ng-template>

        <ng-template pTemplate="header">
            <tr>
                <th pSortableColumn="order.id" style="width:10%">
                    <span class="flex items-center gap-2">ID <p-sortIcon field="order.id"></p-sortIcon></span>
                </th>
                <th pSortableColumn="order.clientName" style="width:15%">
                    <span class="flex items-center gap-2">Numero de compte <p-sortIcon field="order.clientName"></p-sortIcon></span>
                </th>
                <th pSortableColumn="order.clientName" style="width:15%">
                    <span class="flex items-center gap-2">Numero client <p-sortIcon field="order.clientName"></p-sortIcon></span>
                </th>
                <th pSortableColumn="order.clientName" style="width:15%">
                    <span class="flex items-center gap-2">Nom du client <p-sortIcon field="order.clientName"></p-sortIcon></span>
                </th>
                <th pSortableColumn="order.borrowAmount" style="width:15%">
                    <span class="flex items-center gap-2">Montant demandé <p-sortIcon field="order.borrowAmount"></p-sortIcon></span>
                </th>
                <th pSortableColumn="order.clientName" style="width:15%">
                    <span class="flex items-center gap-2">Agence <p-sortIcon field="order.clientName"></p-sortIcon></span>
                </th>
                <th pSortableColumn="decision" style="width:15%">
                    <span class="flex items-center gap-2">Statut <p-sortIcon field="decision"></p-sortIcon></span>
                </th>
                <th style="width:15%; text-align: center;">Détails</th>
            </tr>
        </ng-template>

        <ng-template pTemplate="body" let-taskDto>
            <tr>
                <td>{{ taskDto.order.id }}</td>
                <td>{{ taskDto.order.numeroDeCompte }}</td>
                <td>{{ taskDto.order.numeroClient }}</td>
                <td>Hamza Ramadan</td>
                <!-- Use the currency pipe for proper formatting -->
                <td>{{ taskDto.order.amountToBorrow }} MAD</td>
                <td>{{ taskDto.order.agence }}</td>
                <td>
                    <!-- Use a Tag for a cleaner status display. Assumes taskDto.decision exists -->
                    <p-tag [value]="taskDto.order.decision" [severity]="getSeverity(taskDto.order.decision)"></p-tag>
                </td>
                <td style="text-align: center;">
                    <button pButton pRipple icon="pi pi-arrow-right" class="p-button-rounded p-button-text" (click)="goToOrderDetails(taskDto.processInstanceId)" pTooltip="Voir les détails" tooltipPosition="top"></button>
                </td>
            </tr>
        </ng-template>
        
        <ng-template pTemplate="emptymessage">
            <tr>
                <td colspan="5" class="text-center">Aucune demande de financement trouvée.</td>
            </tr>
        </ng-template>

    </p-table>
</div>`,
    providers: [CustomerService]
})
export class UserList implements OnInit {
    taskDtos: any[] = [];
    status: string[] = ["En cours de traitement", "Analyse automatique en cours", "En attente d'informations complémentaires", "Validation analyste", "Pré-accepté", "Accepté", "Signé", "Débloqué", "Rejeté"];
    numeroDeCompte: string[] = [
    "001234567890",
    "002345678901",
    "003456789012",
    "004567890123",
    "005678901234",
    "006789012345",
    "007890123456",
    "008901234567",
    "009012345678"
    ];

    numeroClient: string[] = [
    "C12345678",
    "C23456789",
    "C34567890",
    "C45678901",
    "C56789012",
    "C67890123",
    "C78901234",
    "C89012345",
    "C90123456"
    ];

    agence: string[] = [
    "Agence Rabat Hassan",
    "Agence Casablanca Centre",
    "Agence Marrakech Guéliz",
    "Agence Fès Atlas",
    "Agence Tanger Corniche",
    "Agence Agadir Talborjt",
    "Agence Oujda Al Qods",
    "Agence Meknès Ville Nouvelle",
    "Agence Kénitra Centre"
    ];
    loading: boolean = true;

    constructor(
        private tasksService: TasksService,
        private router: Router
    ) {}

    ngOnInit() {
        this.tasksService.getMockTasks().subscribe({
            next: (taskDtos: any[]) => {
                this.taskDtos = taskDtos;
                this.loading = false;
                this.taskDtos.forEach((task, index) => {
                    task.order!.decision = this.status[index];
                    task.order!.agence = this.agence[index];
                    task.order!.numeroDeCompte = this.numeroDeCompte[index];
                    task.order!.numeroClient = this.numeroClient[index];
                    task.order!.decision = this.status[index];
                });
                console.log("data : ", taskDtos);
            },
            error: (err) => {
                console.error("Failed to fetch tasks", err);
                this.loading = false;
            }
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    goToOrderDetails(processInstanceId: number) {
        this.router.navigate(['/ecommerce/order-summary/', processInstanceId]);
    }

    getSeverity(decision: string | null): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
  switch (decision) {
    case 'En cours de traitement':
    case 'Analyse automatique en cours':
    case 'Validation analyste':
      return 'info';

    case 'En attente d\'informations complémentaires':
    case 'Pré-accepté':
      return 'warn';

    case 'Accepté':
    case 'Signé':
    case 'Débloqué':
      return 'success';

    case 'Rejeté':
      return 'danger';

    default:
      return 'secondary';
  }
}

}