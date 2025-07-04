import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import { TasksService } from '../service/tasks.service';
import { TaskDto } from '@/types/taskDto';
import { Order } from '@/types/order';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-order-summary',
    imports: [CommonModule, ButtonModule, CardModule, DialogModule],
    template: `
<div>
    <div class="card mt-4">
            <div class="text-surface-900 dark:text-surface-0 font-bold text-4xl my-2">Détails de la commande</div>
            <div style="height:3px;background:linear-gradient(90deg, var(--primary-color) 0%, rgba(33, 150, 243, 0) 50%);"></div>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div class="mb-4 sm:mb-0">
                    <span class="font-medium text-xl text-surface-900 dark:text-surface-0 mr-2">Numéro de commande:</span>
                    <span class="font-medium text-xl text-blue-500">451234</span>
                </div>
                <div>
                    <button pButton pRipple label="Details" icon="pi pi-list" outlined class="mr-2"></button>
                    <button pButton pRipple label="Print" icon="pi pi-print" class="p-button-outlined" outlined></button>
                </div>
            </div>
            <div class="flex">
                <div class="rounded border-surface-200 dark:border-surface-700 border w-1/2 ">
                    <ul class="list-none p-0 m-0">
                        <li
                            *ngFor="let product of products; let i = index"
                            class="p-4 border-surface-200 dark:border-surface-700 flex items-start sm:items-center"
                            [ngClass]="{
                                'border-bottom-1': i !== products.length - 1
                            }"
                        >
                            <img [src]="product.image" class="w-12 sm:w-32 flex-shrink-0 mr-4 shadow" />
                            <div class="flex flex-col">
                                <span class="text-surface-900 dark:text-surface-0 font-semibold text-xl mb-2">{{ product.name }}</span>
                                <span class="text-surface-900 dark:text-surface-0 font-medium">Quantité: {{ product.quantity }}</span>
                            </div>
                            <span class="text-surface-900 dark:text-surface-0 font-medium text-lg ml-auto">{{ product.price }}</span>
                        </li>
                    </ul>
                </div>
                <div class="flex flex-wrap mt-8 pb-4 w-1/2 px-6">
                <div class="w-full lg:w-full pl-4 lg:pl-0 lg:pr-4 flex items-end mt-8 lg:mt-0">
                    <ul class="list-none p-0 m-0 w-full">
                        <li class="mb-4">
                            <span class="font-bold text-surface-900 dark:text-surface-0">Sommaire</span>
                        </li>
                        <li class="flex justify-between mb-4">
                            <span class="text-surface-900 dark:text-surface-0">Montant total</span>
                            <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">7998 MAD</span>
                        </li>
                        <li class="flex justify-between mb-4">
                            <span class="text-surface-900 dark:text-surface-0">Apport personnel</span>
                            <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">998 MAD</span>
                        </li>
                        <li class="flex justify-between mb-4">
                            <span class="text-surface-900 dark:text-surface-0">Montant financé</span>
                            <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">7000 MAD</span>
                        <li class="flex justify-between mb-4">
                            <span class="text-surface-900 dark:text-surface-0">Durée du financement</span>
                            <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">24 mois</span>
                        </li>
                        <li class="flex justify-between mb-4">
                            <span class="text-surface-900 dark:text-surface-0">Marge</span>
                            <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">{{calculatedInterst}} MAD</span>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
    </div>
    <p-card>
        <ng-template pTemplate="title">
            <h2 class="text-2xl font-bold">Demande de financement N° 4326</h2>
        </ng-template>
        <ng-template pTemplate="subtitle">
            Veuillez examiner les informations de la demande ci-dessous pour prendre une décision.
        </ng-template>

        <ng-template pTemplate="content">
            <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 p-4 border-t border-surface-200 dark:border-surface-700">
                
                <div class="xl:col-span-12">
                    <div class="rounded-lg border border-surface-200 dark:border-surface-600">
                        <div class="p-3 bg-surface-50 dark:bg-surface-700 font-bold rounded-t-lg text-surface-700 dark:text-surface-200"><i class="pi pi-user mr-2"></i>Demandeur</div>
                        <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div class="flex justify-between border-b pb-1"><span>Nom et prénom :</span> <span class="font-semibold">Hamza Ramadan</span></div>
                            <div class="flex justify-between border-b pb-1"><span>Age :</span> <span class="font-semibold">26</span></div>
                            <div class="flex justify-between border-b pb-1"><span>Profession :</span> <span class="font-semibold">Développeur Java</span></div>
                            <div class="flex justify-between border-b pb-1"><span>N° de compte :</span> <span class="font-semibold">782987329</span></div>
                            <div class="flex justify-between border-b pb-1"><span>Employeur :</span> <span class="font-semibold">RADEEMA</span></div>
                            <div class="flex justify-between border-b pb-1"><span>Depuis :</span><span class="font-semibold">25/04/2025</span></div>
                            <div class="flex justify-between border-b pb-1 md:col-span-1"><span>Ancienté du compte (mois) :</span> <span class="font-semibold">120</span></div>
                        </div>
                    </div>
                </div>

                <div class="xl:col-span-5 flex flex-col gap-6">
                    <div class="rounded-lg border border-surface-200 dark:border-surface-600">
                        <div class="p-3 bg-surface-50 dark:bg-surface-700 font-bold rounded-t-lg text-surface-700 dark:text-surface-200"><i class="pi pi-shopping-cart mr-2"></i>Financement</div>
                        <ul class="list-none m-0 p-4 space-y-3">
                            <li class="flex justify-between"><span>Nature du bien :</span> <span class="font-semibold">Machine à Laver</span></li>
                            <li class="flex justify-between"><span>Marque :</span> <span class="font-semibold">Samsung</span></li>
                            <li class="flex justify-between"><span>Partenaire :</span> <span class="font-semibold">BOUSFIHA</span></li>
                            <li class="flex justify-between"><span>Employeur :</span> <span class="font-semibold">RADEEMA</span></li>
                            <li class="flex justify-between"><span>Prix :</span> <span class="font-semibold text-primary">7998 MAD</span></li>
                            <li class="flex justify-between"><span>Ancienté du compte (mois) :</span> <span class="font-semibold">120</span></li>
                            <li class="flex justify-between bg-surface-50 dark:bg-surface-700 p-2 rounded"><span>Montant MOURABAHA :</span> <span class="font-semibold">7000,00 MAD</span></li>
                            <li class="flex justify-between bg-surface-50 dark:bg-surface-700 p-2 rounded"><span>HAMISH JIDYHA :</span> <span class="font-semibold">2000,00 MAD</span></li>
                            <li class="flex justify-between"><span>Durée (mois) :</span></li>
                            <li class="flex justify-between"><span>Taux Marge HT :</span></li>
                            <li class="flex justify-between"><span>Montant échéance :</span></li>
                        </ul>
                    </div>

                    <div class="rounded-lg border border-surface-200 dark:border-surface-600 relative">
                        <div class="p-3 bg-surface-50 dark:bg-surface-700 font-bold rounded-t-lg text-surface-700 dark:text-surface-200"><i class="pi pi-list mr-2"></i>Encours MOURABAHA</div>
                        <div class="p-4 overflow-x-auto">
                            <table class="w-full text-sm">
                                <thead class="text-left text-surface-500 dark:text-surface-400">
                                    <tr><th class="p-2">Type</th><th class="p-2">N° Dossier</th><th class="p-2">Échéance</th><th class="p-2">Capital restant</th><th class="p-2">Date fin</th></tr>
                                </thead>
                                <tbody>
                                    <tr class="border-t"><td class="p-2 font-semibold">IMMOBILIÈRE</td><td class="p-2">500002</td><td class="p-2">3000,50</td><td class="p-2">520000,00</td><td class="p-2">31/03/2030</td></tr>
                                    <tr class="border-t"><td class="p-2 font-semibold">AUTO</td><td class="p-2">500003</td><td class="p-2">2150,00</td><td class="p-2">60000,00</td><td class="p-2">30/04/2027</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="xl:col-span-7 flex flex-col gap-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="rounded-lg border border-surface-200 dark:border-surface-600">
                            <div class="p-3 bg-surface-50 dark:bg-surface-700 font-bold rounded-t-lg text-surface-700 dark:text-surface-200"><i class="pi pi-wallet mr-2"></i>Ressources et charges</div>
                            <ul class="list-none m-0 p-4 space-y-3">
                                <li class="flex justify-between"><span>Revenus mensuels :</span> <span class="font-semibold">15000 MAD</span></li>
                                <li class="flex justify-between"><span>Autres Revenus :</span> <span class="font-semibold">5000 MAD</span></li>
                                <li class="flex justify-between"><span>Charges :</span> <span class="font-semibold">6000 MAD</span></li>
                            </ul>
                        </div>

                        <div class="rounded-lg border border-surface-200 dark:border-surface-600 relative">
                            <div class="p-3 bg-surface-50 dark:bg-surface-700 font-bold rounded-t-lg text-surface-700 dark:text-surface-200"><i class="pi pi-chart-line mr-2"></i>Crédit bureau</div>
                            <ul class="list-none m-0 p-4 space-y-3">
                                <li class="flex justify-between"><span>Encours crédit en cours :</span> <span class="font-semibold">60000 MAD</span></li>
                                <li class="flex justify-between"><span>Score :</span> <span class="font-bold text-orange-500">C</span></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="rounded-lg border border-surface-200 dark:border-surface-600 relative">
                            <div class="p-3 bg-surface-50 dark:bg-surface-700 font-bold rounded-t-lg text-surface-700 dark:text-surface-200"><i class="pi pi-chart-bar mr-2"></i>SCIP</div>
                            <ul class="list-none m-0 p-4 space-y-3">
                                <li class="flex justify-between"><span>Statut :</span> <span class="font-semibold text-red-500">NEANT</span></li>
                                <li class="flex justify-between bg-surface-100 dark:bg-surface-700 -m-4 mt-3 p-4"><span>Date statut :</span> <span class="font-semibold">15/06/2025</span></li>
                            </ul>
                        </div>

                        <div class="rounded-lg border border-surface-200 dark:border-surface-600 relative">
                            <div class="p-3 bg-surface-50 dark:bg-surface-700 font-bold rounded-t-lg text-surface-700 dark:text-surface-200"><i class="pi pi-id-card mr-2"></i>KYC</div>
                            <ul class="list-none m-0 p-4 space-y-3">
                                <li class="flex justify-between"><span>Statut :</span> <span class="font-semibold text-green-500">OK</span></li>
                                <li class="flex justify-between bg-surface-100 dark:bg-surface-700 -m-4 mt-3 p-4"><span>Date statut :</span> <span class="font-semibold">15/06/2025</span></li>
                            </ul>
                        </div>
                    </div>

                    <div class="rounded-lg border border-surface-200 dark:border-surface-600">
                        <div class="p-3 bg-surface-50 dark:bg-surface-700 font-bold rounded-t-lg text-surface-700 dark:text-surface-200"><i class="pi pi-lock mr-2"></i>Garanties</div>
                        <div class="p-4">
                            <table class="w-full text-sm">
                                <thead class="text-left text-surface-500 dark:text-surface-400">
                                    <tr><th class="p-2">Type</th><th class="p-2">Montant</th></tr>
                                </thead>
                                <tbody>
                                    <tr class="border-t bg-surface-50 dark:bg-surface-700"><td class="p-2 font-semibold">Nantissement</td><td class="p-2">15000,00 MAD</td></tr>
                                    <tr class="border-t"><td class="p-2 font-semibold">TAKAFUL</td><td class="p-2">-</td></tr>
                                    <tr class="border-t bg-surface-50 dark:bg-surface-700"><td class="p-2 font-semibold">Domiciliation salaire</td><td class="p-2">-</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="rounded-lg border border-surface-200 dark:border-surface-600">
                        <div class="p-3 bg-surface-50 dark:bg-surface-700 font-bold rounded-t-lg text-surface-700 dark:text-surface-200"><i class="pi pi-check-circle mr-2"></i>Décision</div>
                        <div class="p-4 flex justify-end gap-2">
                            <button pButton pRipple label="Demander plus d'informations" icon="pi pi-info-circle" class="p-button-outlined"></button>
                            <button pButton pRipple *ngIf="this.order.decision == 'Accepté' || !this.order.decision" [label]="this.order.decision == 'Accepté' ? 'Accepté' : 'Accepter'" icon="pi pi-check" class="p-button-success" [disabled]="this.order.decision == 'Accepté'" (click)="showApprovalDialog()"></button>
                            <button pButton pRipple *ngIf="this.order.decision == 'Rejeté' || !this.order.decision" [label]="this.order.decision == 'Rejeté' ? 'Rejeté' : 'Rejeter'" icon="pi pi-times" class="p-button-danger" [disabled]="this.order.decision == 'Rejeté'" (click)="completeDecisionTask(this.task.processInstanceId!, false)"></button>
                        </div>
                    </div>
                </div>
            </div>
        </ng-template>
    </p-card>
    <p-dialog header="Accepter la demande" [modal]="true" [(visible)]="isApprovalDialog" [style]="{ width: '25rem' }">
    <span class="p-text-secondary block mb-8">Etes-vous sûr de vouloir accepter la demande ?</span>
    <div class="space-x-2">
        <button pButton pRipple icon="pi pi-check" class="p-button-success" (click)="completeDecisionTask(this.task.processInstanceId!, true)">Oui</button>
        <button pButton pRipple icon="pi pi-times" class="p-button-danger" (click)="closeApprovalDialog()">Annuler</button>
    </div>
    </p-dialog>
</div>
    `
})
export class OrderSummary {

    processInstanceId: string | null = null;
    isSubmitting: boolean = false;
    completionDate: Date | null = null;

    order: any = {};
    task: TaskDto = { id: null, name: '', assignee: null, processInstanceId: '', order: this.order };
    calculatedInterst: number = 0;

    isApprovalDialog: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private tasksService: TasksService,
        private router: Router
    ) {}
    
    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            this.processInstanceId = paramMap.get("id");
            if (this.processInstanceId) {
                this.tasksService.getTaskByProcessInstanceId(this.processInstanceId).subscribe(taskData => {
                    if (taskData) {
                        this.task = taskData;
                        if (taskData.order) {
                            this.order = taskData.order;
                            this.calculatedInterst = (5 / 100) * this.order.borrowAmount;
                        }
                    }
                });
            }
        });
    }

    showApprovalDialog() {
        this.isApprovalDialog = true;
    }

    closeApprovalDialog() {
        this.isApprovalDialog = false;
    }

    completeDecisionTask(processInstanceId: string, decision: boolean) {
        this.tasksService.completeDecisionTask(processInstanceId, decision).subscribe(() => {
            this.tasksService.getTaskByProcessInstanceId(processInstanceId).subscribe(taskData => {
                    if (taskData) {
                        this.task = taskData;
                        if (taskData.order) {
                            this.order = taskData.order;
                        }
                    }
                    console.log('Task and Order loaded:', this.task);
                    this.closeApprovalDialog();
                });
        }, error => {
            console.log("Error :", error);
        });
    }

    products = [
        {
            name: 'BOSCH TC SERIE 8 PRS9A6B70 90CM NOIR',
            price: '3999 MAD',
            quantity: '2',
            image: 'https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/3/0/3037333-cb-22408_1.png'
        }
    ];
}