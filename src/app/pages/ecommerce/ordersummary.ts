import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import { TasksService } from '../service/tasks.service';
import { TaskDto } from '@/types/taskDto';
import { Order } from '@/types/order';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-order-summary',
    imports: [CommonModule, ButtonModule, CardModule, RouterLink],
    template: `
        <!-- Main View: Both cards are now always visible -->
<div>
    <!-- V1: Task Review View -->
    <p-card class="relative">
        <ng-template pTemplate="title">
            <h2 class="text-2xl font-bold">Revue de la demande de prêt</h2>
        </ng-template>
        <ng-template pTemplate="subtitle">
            Veuillez examiner les informations fournies par le client ci-dessous, puis prendre une décision.
        </ng-template>
        <div class="absolute right-4 top-4" *ngIf="this.order.decision != null">
            <p-button [label]="order.decision ? 'Acceptée' : 'Refusée'" [severity]="order.decision ? 'success' : 'danger'" rounded />
        </div>
        <ng-template pTemplate="content">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border-t border-surface-200 dark:border-surface-700">
                <div>
                    <h3 class="font-semibold text-lg mb-3 text-surface-800 dark:text-surface-100">Détails de la demande</h3>
                    <ul class="list-none p-0 m-0 space-y-3">
                        <li class="flex justify-between">
                            <span class="text-surface-500 dark:text-surface-300">Montant demandé:</span>
                            <span class="font-medium text-primary">{{ order.amountToBorrow | currency:'MAD' }}</span>
                        </li>
                        <li class="flex justify-between">
                            <span class="text-surface-500 dark:text-surface-300">Nom du client:</span>
                            <span class="font-medium text-surface-700 dark:text-surface-200">John Doe</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-semibold text-lg mb-3 text-surface-800 dark:text-surface-100">Évaluation du client</h3>
                    <div class="rounded-md bg-surface-50 dark:bg-surface-800 p-4 space-y-3">
                        <div class="flex items-center">
                            <i class="pi pi-check-circle text-green-500 mr-3 text-xl"></i>
                            <div><span class="font-semibold">Bon historique de crédits</span></div>
                        </div>
                        <div class="flex items-center">
                            <i class="pi pi-check-circle text-green-500 mr-3 text-xl"></i>
                            <div><span class="font-semibold">Employé</span></div>
                        </div>
                        <div class="flex items-center">
                            <i class="pi pi-exclamation-triangle text-yellow-500 mr-3 text-xl"></i>
                            <div><span class="font-semibold">Crédits en cours</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </ng-template>
        <ng-template pTemplate="footer">
            <div class="flex justify-end gap-2 border-t border-surface-200 dark:border-surface-700 pt-4">
                <button pButton pRipple label="Refuser" [disabled]="this.order.decision" icon="pi pi-times" class="p-button-danger" (click)="completeDecisionTask(this.task.processInstanceId!, false)"></button>
                <button pButton pRipple label="Accepter" [disabled]="this.order.decision" icon="pi pi-check" class="p-button-success" (click)="completeDecisionTask(this.task.processInstanceId!, true)"></button>
            </div>
        </ng-template>
    </p-card>

    <div class="card mt-4">
            <div class="text-surface-900 dark:text-surface-0 font-bold text-4xl my-2">Détails de la commande</div>
            <div style="height:3px;background:linear-gradient(90deg, var(--primary-color) 0%, rgba(33, 150, 243, 0) 50%);"></div>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-8">
                <div class="mb-4 sm:mb-0">
                    <span class="font-medium text-xl text-surface-900 dark:text-surface-0 mr-2">Numéro de commande:</span>
                    <span class="font-medium text-xl text-blue-500">451234</span>
                </div>
                <div>
                    <button pButton pRipple label="Details" icon="pi pi-list" outlined class="mr-2"></button>
                    <button pButton pRipple label="Print" icon="pi pi-print" class="p-button-outlined" outlined></button>
                </div>
            </div>
            <div class="rounded border-surface-200 dark:border-surface-700 border">
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
                            <span class="text-surface-700 dark:text-surface-100 font-medium mb-4">{{ product.color }} | {{ product.size }}</span>
                            <span class="text-surface-900 dark:text-surface-0 font-medium">Quantity: {{ product.quantity }}</span>
                        </div>
                        <span class="text-surface-900 dark:text-surface-0 font-medium text-lg ml-auto">{{ product.price }}</span>
                    </li>
                </ul>
            </div>
            <div class="flex flex-wrap mt-8 pb-4">
                <div class="w-full lg:w-6/12 pl-4">
                    <span class="font-medium text-surface-900 dark:text-surface-0">Payment</span>
                    <div class="flex items-center mt-4">
                        <img src="/demo/images/ecommerce/ordersummary/visa.png" class="w-16 mr-4" alt="visa" />
                        <div class="flex flex-col">
                            <span class="text-surface-900 dark:text-surface-0 mb-1">Visa Debit Card</span>
                            <span class="text-surface-900 dark:text-surface-0 font-medium">**** **** **** 1234</span>
                        </div>
                    </div>
                </div>
                <div class="w-full lg:w-6/12 pl-4 lg:pl-0 lg:pr-4 flex items-end mt-8 lg:mt-0">
                    <ul class="list-none p-0 m-0 w-full">
                        <li class="mb-4">
                            <span class="font-medium text-surface-900 dark:text-surface-0">Summary</span>
                        </li>
                        <li class="flex justify-between mb-4">
                            <span class="text-surface-900 dark:text-surface-0">Subtotal</span>
                            <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">$36.00</span>
                        </li>
                        <li class="flex justify-between border-t border-surface-200 dark:border-surface-700 py-4">
                            <span class="text-surface-900 dark:text-surface-0 font-medium">Total</span>
                            <span class="text-surface-900 dark:text-surface-0 font-bold text-lg">$41.00</span>
                        </li>
                    </ul>
                </div>
            </div>
    </div>
</div>
    `
})
export class OrderSummary {

    processInstanceId: string | null = null;
    isSubmitting: boolean = false;
    completionDate: Date | null = null;

    order: Order = { id: null, amountToBorrow: null, decision: null, signature: '' };
    task: TaskDto = { id: null, name: '', assignee: null, processInstanceId: '', order: this.order };

    constructor(
        private route: ActivatedRoute,
        private tasksService: TasksService
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
                        }
                    }
                    console.log('Task and Order loaded:', this.task);
                });
            }
        });
    }

    completeDecisionTask(processInstanceId: string, decision: boolean) {
        if (confirm("Etes-vous sur ?") == true) {
        this.tasksService.completeDecisionTask(processInstanceId, decision).subscribe(() => {
            this.tasksService.getTaskByProcessInstanceId(processInstanceId).subscribe(taskData => {
                    if (taskData) {
                        this.task = taskData;
                        if (taskData.order) {
                            this.order = taskData.order;
                        }
                    }
                    console.log('Task and Order loaded:', this.task);
                });
        }, error => {
            console.log("Error :", error);
        });
        }
    }

    products = [
        {
            name: 'Cotton Sweatshirt',
            size: 'Medium',
            color: 'White',
            price: '$12',
            quantity: '1',
            image: '/demo/images/ecommerce/ordersummary/order-summary-1-1.png'
        },
        {
            name: 'Regular Jeans',
            size: 'Large',
            color: 'Black',
            price: '$24',
            quantity: '1',
            image: '/demo/images/ecommerce/ordersummary/order-summary-1-2.png'
        }
    ];

    /**
     * Completes the task with a given decision.
     * @param decision The outcome of the review ('accepted' or 'denied').
     */
    // completeTask(decision: 'accepted' | 'denied'): void {
    //     if (!this.task.id) {
    //         console.error('Task ID is not available. Cannot complete task.');
    //         return;
    //     }

    //     this.isSubmitting = true;
    //     const variables = { decision: { value: decision } };

    //     this.tasksService.completeTask(this.task.id, variables).subscribe({
    //         next: () => {
    //             console.log(`Task ${this.task.id} completed with decision: ${decision}`);
    //             // Update component state to show the completion view
    //             this.order.decision = decision; // Store decision for display
    //             this.completionDate = new Date(); // Store completion date
    //             this.taskState = 'completed';
    //             this.isSubmitting = false;
    //         },
    //         error: (err) => {
    //             console.error('Failed to complete task', err);
    //             this.isSubmitting = false; 
    //             // Optionally show an error message
    //         }
    //     });
    // }
}