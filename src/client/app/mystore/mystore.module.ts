import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { StoreHomeModule } from './store-home/store-home.module';
import { MystoreComponent } from './mystore.component';

import {TopNavComponent, SidebarComponent } from '../shared/index';


@NgModule({
    imports: [
        CommonModule,
    	RouterModule,
    	DropdownModule,
        ModalModule,
        SharedModule,
        StoreHomeModule
    ],
    declarations: [MystoreComponent],
    exports: [MystoreComponent]
})

export class MystoreModule { }
