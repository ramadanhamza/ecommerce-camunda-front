import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li
                app-menuitem
                *ngIf="!item.separator"
                [item]="item"
                [index]="i"
                [root]="true"
            ></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `,
})
export class AppMenu {
    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Demandes des clients',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Liste des demandes',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['profile/demandes-financement'],
                    }
                ],
            }
        ];
    }
}
