import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { StoreListComponent } from './store-list.component';
import { StoreDetailComponent } from './store-detail.component';
import { StoreService } from './store.service';
import { Product } from './product';

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule, RouterModule],
    declarations: [StoreListComponent, StoreDetailComponent],
    providers: [StoreService],
    exports: [StoreListComponent, StoreDetailComponent]
})

export class StoreHomeModule { }
