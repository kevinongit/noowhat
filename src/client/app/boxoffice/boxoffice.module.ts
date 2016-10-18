import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { BoxofficeComponent } from './boxoffice.component';
import { HomeModule } from './home/home.module';

import {TopNavComponent, SidebarComponent } from '../shared/index';


@NgModule({
    imports: [
        CommonModule,
    	RouterModule,
    	DropdownModule,
        ModalModule,
        SharedModule,
        HomeModule
    ],
    declarations: [BoxofficeComponent],
    exports: [BoxofficeComponent]
})

export class BoxofficeModule { }
